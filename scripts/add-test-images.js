import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://username:password@ep-xxxxx.us-east-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(databaseUrl);

async function addTestImages() {
    console.log('🖼️  Adding test images to projects...\n');

    try {
        // Get all projects
        const projects = await sql`SELECT * FROM projects ORDER BY id LIMIT 2`;

        if (projects.length === 0) {
            console.log('⚠️  No projects found in database. Please add a project first from the admin panel.');
            return;
        }

        console.log(`Found ${projects.length} projects\n`);

        // Sample image URLs (using placeholder images)
        const sampleImages = [
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'
        ];

        // Add images to the first project
        const firstProject = projects[0];
        await sql`
            UPDATE projects 
            SET images = ${sampleImages}
            WHERE id = ${firstProject.id}
        `;

        console.log(`✅ Added ${sampleImages.length} test images to project: "${firstProject.title}"`);
        console.log('   Images:');
        sampleImages.forEach((img, i) => console.log(`   ${i + 1}. ${img}`));

        console.log('\n🎉 Done! Refresh your browser to see the "View Images" button!');
        console.log('\n📍 The button will appear next to "Live Demo" on the project card.');

    } catch (error) {
        console.error('❌ Error adding test images:', error);
        process.exit(1);
    }
}

addTestImages();
