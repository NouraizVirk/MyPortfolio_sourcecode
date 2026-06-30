import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_3a1neTCtilYz@ep-old-waterfall-ahxbr3o9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(databaseUrl);

async function addSampleProject() {
    console.log('📝 Adding sample project with images...\n');

    try {
        const sampleProject = {
            id: Date.now(),
            title: 'Sample Project with Images',
            description: 'This is a test project to demonstrate the image gallery feature',
            tech: ['React', 'Node.js', 'PostgreSQL'],
            github: 'https://github.com/sample/project',
            demo: 'https://sample-demo.com',
            year: '2024',
            images: [
                'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
                'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80'
            ]
        };

        const result = await sql`
            INSERT INTO projects (id, title, description, tech, github, demo, year, images)
            VALUES (
                ${sampleProject.id},
                ${sampleProject.title},
                ${sampleProject.description},
                ${sampleProject.tech},
                ${sampleProject.github},
                ${sampleProject.demo},
                ${sampleProject.year},
                ${sampleProject.images}
            )
            RETURNING *
        `;

        console.log('✅ Sample project added successfully!');
        console.log(`   Title: ${result[0].title}`);
        console.log(`   Images: ${result[0].images.length}`);
        console.log('\n🎉 Now refresh your browser and you should see the "View Images" button!');
        console.log('   The button will show: "View Images (3)"');

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

addSampleProject();
