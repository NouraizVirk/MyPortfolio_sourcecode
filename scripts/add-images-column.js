import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://username:password@ep-xxxxx.us-east-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(databaseUrl);

async function addImagesColumn() {
    console.log('🔄 Adding images column to projects table...\n');

    try {
        // Add images column to projects table
        await sql`
            ALTER TABLE projects 
            ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT ARRAY[]::TEXT[]
        `;

        console.log('✅ Images column added successfully!');
        console.log('\nProjects table now supports:');
        console.log('  - Multiple images per project');
        console.log('  - Image URLs stored as text array');
        console.log('  - Default empty array for existing projects');

        // Verify the column was added
        const columns = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'projects' AND column_name = 'images'
        `;

        if (columns.length > 0) {
            console.log(`\n✅ Verified: images column exists (type: ${columns[0].data_type})`);
        }

    } catch (error) {
        console.error('❌ Error adding images column:', error);
        process.exit(1);
    }
}

addImagesColumn();
