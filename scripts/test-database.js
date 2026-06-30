import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_3a1neTCtilYz@ep-old-waterfall-ahxbr3o9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(databaseUrl);

async function testConnection() {
    console.log('🧪 Testing Neon database connection...\n');

    try {
        // Test 1: List all tables
        console.log('Test 1: Listing all tables...');
        const tables = await sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
        `;
        console.log(`✅ Found ${tables.length} tables:`);
        tables.forEach(t => console.log(`   - ${t.table_name}`));

        // Test 2: Check projects table structure
        console.log('\nTest 2: Checking projects table structure...');
        const projectColumns = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'projects'
            ORDER BY ordinal_position
        `;
        console.log(`✅ Projects table has ${projectColumns.length} columns`);

        // Test 3: Count records in each table
        console.log('\nTest 3: Counting records in each table...');
        const projectCount = await sql`SELECT COUNT(*) as count FROM projects`;
        const skillsCount = await sql`SELECT COUNT(*) as count FROM skills`;
        const experiencesCount = await sql`SELECT COUNT(*) as count FROM experiences`;
        const certificationsCount = await sql`SELECT COUNT(*) as count FROM certifications`;
        const leadershipCount = await sql`SELECT COUNT(*) as count FROM leadership`;
        const messagesCount = await sql`SELECT COUNT(*) as count FROM messages`;

        console.log(`   - projects: ${projectCount[0].count} records`);
        console.log(`   - skills: ${skillsCount[0].count} records`);
        console.log(`   - experiences: ${experiencesCount[0].count} records`);
        console.log(`   - certifications: ${certificationsCount[0].count} records`);
        console.log(`   - leadership: ${leadershipCount[0].count} records`);
        console.log(`   - messages: ${messagesCount[0].count} records`);

        // Test 4: Insert a test project
        console.log('\nTest 4: Testing INSERT operation...');
        const testId = Date.now();
        await sql`
            INSERT INTO projects (id, title, description, tech, github, demo, year)
            VALUES (
                ${testId},
                'Test Project',
                'This is a test project to verify database connectivity',
                ARRAY['React', 'Node.js'],
                'https://github.com/test',
                'https://demo.test',
                '2024'
            )
        `;
        console.log('✅ Test record inserted successfully');

        // Test 5: Read the test project back
        console.log('\nTest 5: Testing SELECT operation...');
        const testProject = await sql`SELECT * FROM projects WHERE id = ${testId}`;
        console.log('✅ Test record retrieved:', testProject[0].title);

        // Test 6: Delete the test project
        console.log('\nTest 6: Testing DELETE operation...');
        await sql`DELETE FROM projects WHERE id = ${testId}`;
        console.log('✅ Test record deleted successfully');

        console.log('\n🎉 All database tests passed!');
        console.log('\n✅ Your Neon database is fully configured and working!');
        console.log('\nNext steps:');
        console.log('  1. Open http://localhost:5174 in your browser');
        console.log('  2. Check the console for "✅ Neon database initialized successfully"');
        console.log('  3. Go to /admin to manage your portfolio data');
        console.log('  4. Your data will now persist in the cloud! 🚀');

    } catch (error) {
        console.error('❌ Database test failed:', error);
        process.exit(1);
    }
}

testConnection();
