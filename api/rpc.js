import { dbService } from './lib/dbService.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { action, args = [] } = req.body;
        
        // Handle authentication verification
        if (action === 'auth.login') {
            const password = args[0];
            const isValid = password === process.env.ADMIN_PASSWORD;
            return res.status(200).json({ success: isValid });
        }

        // All non-getAll actions are considered mutating and require authentication
        // Exception: messages.add can be public (if users submit contact forms)
        const isPublicAction = action.endsWith('.getAll') || action === 'messages.add';
        
        if (!isPublicAction) {
            const adminPassword = req.headers['x-admin-password'];
            if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        }

        const [entity, method] = action.split('.');
        if (!dbService[entity] || !dbService[entity][method]) {
            return res.status(400).json({ error: `Invalid action: ${action}` });
        }

        const result = await dbService[entity][method](...args);
        return res.status(200).json(result);
    } catch (error) {
        console.error('RPC Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
