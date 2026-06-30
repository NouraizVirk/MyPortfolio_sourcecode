import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is not set in the environment');

const sql = neon(databaseUrl);

async function setupDatabase() {
    console.log('🚀 Setting up Neon database...\n');

    try {
        // Create Projects table
        console.log('Creating projects table...');
        await sql`
            CREATE TABLE IF NOT EXISTS projects (
                id BIGINT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                tech TEXT[] NOT NULL,
                github TEXT,
                demo TEXT,
                year TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            )
        `;
        console.log('✅ Projects table created');

        // Create Skills table
        console.log('Creating skills table...');
        await sql`
            CREATE TABLE IF NOT EXISTS skills (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL UNIQUE,
                icon TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            )
        `;
        console.log('✅ Skills table created');

        // Create Experiences table
        console.log('Creating experiences table...');
        await sql`
            CREATE TABLE IF NOT EXISTS experiences (
                id BIGINT PRIMARY KEY,
                title TEXT NOT NULL,
                company TEXT NOT NULL,
                location TEXT NOT NULL,
                period TEXT NOT NULL,
                description TEXT NOT NULL,
                achievements TEXT[] NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            )
        `;
        console.log('✅ Experiences table created');

        // Create Certifications table
        console.log('Creating certifications table...');
        await sql`
            CREATE TABLE IF NOT EXISTS certifications (
                id BIGINT PRIMARY KEY,
                title TEXT NOT NULL,
                issuer TEXT NOT NULL,
                date TEXT NOT NULL,
                credential_url TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            )
        `;
        console.log('✅ Certifications table created');

        // Create Leadership table
        console.log('Creating leadership table...');
        await sql`
            CREATE TABLE IF NOT EXISTS leadership (
                id BIGINT PRIMARY KEY,
                title TEXT NOT NULL,
                organization TEXT NOT NULL,
                icon TEXT NOT NULL,
                description TEXT NOT NULL,
                year TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            )
        `;
        console.log('✅ Leadership table created');

        // Create Messages table
        console.log('Creating messages table...');
        await sql`
            CREATE TABLE IF NOT EXISTS messages (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
                read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            )
        `;
        console.log('✅ Messages table created');

        // Create indexes
        console.log('\nCreating indexes...');
        await sql`CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp DESC)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read)`;
        console.log('✅ Indexes created');

        console.log('\n🎉 Database setup complete!');
        console.log('\nTables created:');
        console.log('  ✓ projects');
        console.log('  ✓ skills');
        console.log('  ✓ experiences');
        console.log('  ✓ certifications');
        console.log('  ✓ leadership');
        console.log('  ✓ messages');

        // Test connection by counting tables
        const result = await sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `;
        console.log(`\n✅ Connection verified! Found ${result.length} tables in database.`);

    } catch (error) {
        console.error('❌ Error setting up database:', error);
        process.exit(1);
    }
}

setupDatabase();
