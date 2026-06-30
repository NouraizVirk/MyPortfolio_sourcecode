import { neon } from '@neondatabase/serverless';

// Neon database configuration from environment variables
const databaseUrl = process.env.DATABASE_URL;

// Check if Neon is configured
export const isDatabaseConfigured = () => {
    return databaseUrl &&
        databaseUrl !== 'your_neon_database_url_here' &&
        databaseUrl.includes('neon.tech');
};

// Initialize Neon SQL client only if configured
let sql = null;

if (isDatabaseConfigured()) {
    try {
        sql = neon(databaseUrl);
        console.log('✅ Neon database initialized successfully');
    } catch (error) {
        console.error('❌ Neon database initialization error:', error);
    }
} else {
    console.warn('⚠️ Database not configured. Set DATABASE_URL to enable persistence.');
}

export { sql };
