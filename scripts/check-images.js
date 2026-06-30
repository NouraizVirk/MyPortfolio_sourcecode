import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_3a1neTCtilYz@ep-old-waterfall-ahxbr3o9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(databaseUrl);

async function checkProjectImages() {
    console.log('🔍 Checking project images in database...\n');

    try {
        const projects = await sql`SELECT id, title, images FROM projects`;

        if (projects.length === 0) {
            console.log('⚠️  No projects found in database.');
            return;
        }

        console.log(`Found ${projects.length} project(s):\n`);

        projects.forEach((project, index) => {
            console.log(`${index + 1}. ${project.title}`);
            console.log(`   ID: ${project.id}`);
            console.log(`   Images: ${project.images ? project.images.length : 0}`);
            if (project.images && project.images.length > 0) {
                project.images.forEach((img, i) => {
                    const preview = img.substring(0, 50) + (img.length > 50 ? '...' : '');
                    console.log(`      ${i + 1}. ${preview}`);
                });
            } else {
                console.log('      No images');
            }
            console.log('');
        });

        const projectsWithImages = projects.filter(p => p.images && p.images.length > 0);
        console.log(`\n📊 Summary:`);
        console.log(`   Total projects: ${projects.length}`);
        console.log(`   Projects with images: ${projectsWithImages.length}`);
        console.log(`   Projects without images: ${projects.length - projectsWithImages.length}`);

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

checkProjectImages();
