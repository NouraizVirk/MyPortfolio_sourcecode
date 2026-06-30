import { migrateToDatabase } from './src/utils/migrateToDatabase.js';

console.log('🚀 Starting data migration from localStorage to Neon database...\n');

migrateToDatabase()
    .then(result => {
        if (result.success) {
            console.log('\n✅ Migration completed successfully!');
            console.log('\n📊 Summary:');
            console.log(`   - Projects: ${result.results.projects.migrated} migrated`);
            console.log(`   - Skills: ${result.results.skills.migrated} migrated`);
            console.log(`   - Experiences: ${result.results.experiences.migrated} migrated`);
            console.log(`   - Certifications: ${result.results.certifications.migrated} migrated`);
            console.log(`   - Leadership: ${result.results.leadership.migrated} migrated`);
            console.log(`   - Messages: ${result.results.messages.migrated} migrated`);
            console.log('\n🎉 Your data is now in the cloud database!');
            console.log('\nNext: Run "node add-test-images.js" to add sample images to a project.');
        } else {
            console.error('\n❌ Migration failed:', result.error);
        }
    })
    .catch(error => {
        console.error('\n❌ Migration error:', error);
    });
