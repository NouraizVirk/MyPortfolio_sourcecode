import {
    projectsService,
    skillsService,
    experiencesService,
    certificationsService,
    leadershipService,
    messagesService
} from '../services/dbService';
import { isDatabaseConfigured } from '../db.config';

const STORAGE_KEYS = {
    projects: 'portfolio_projects',
    skills: 'portfolio_skills',
    experiences: 'portfolio_experiences',
    certifications: 'portfolio_certifications',
    leadership: 'portfolio_leadership',
    messages: 'portfolio_messages'
};

/**
 * Migrate data from localStorage to Neon database
 * This should be run once after database is configured
 */
export const migrateToDatabase = async () => {
    if (!isDatabaseConfigured()) {
        console.error('❌ Database is not configured. Please add DATABASE_URL to .env file.');
        return {
            success: false,
            error: 'Database not configured'
        };
    }

    const results = {
        projects: { migrated: 0, errors: 0 },
        skills: { migrated: 0, errors: 0 },
        experiences: { migrated: 0, errors: 0 },
        certifications: { migrated: 0, errors: 0 },
        leadership: { migrated: 0, errors: 0 },
        messages: { migrated: 0, errors: 0 }
    };

    console.log('🚀 Starting migration from localStorage to database...');

    try {
        // Migrate Projects
        const projectsData = localStorage.getItem(STORAGE_KEYS.projects);
        if (projectsData) {
            const projects = JSON.parse(projectsData);
            console.log(`📦 Found ${projects.length} projects in localStorage`);

            try {
                await projectsService.batchUpsert(projects);
                results.projects.migrated = projects.length;
                console.log(`✅ Migrated ${projects.length} projects`);
            } catch (error) {
                console.error('❌ Error migrating projects:', error);
                results.projects.errors++;
            }
        }

        // Migrate Skills
        const skillsData = localStorage.getItem(STORAGE_KEYS.skills);
        if (skillsData) {
            const skills = JSON.parse(skillsData);
            console.log(`📦 Found ${skills.length} skills in localStorage`);

            // Skills might not have IDs, so we'll use name as ID
            const skillsWithIds = skills.map((skill) => ({
                id: skill.id || skill.name,
                name: skill.name,
                icon: skill.icon
            }));

            try {
                await skillsService.batchUpsert(skillsWithIds);
                results.skills.migrated = skills.length;
                console.log(`✅ Migrated ${skills.length} skills`);
            } catch (error) {
                console.error('❌ Error migrating skills:', error);
                results.skills.errors++;
            }
        }

        // Migrate Experiences
        const experiencesData = localStorage.getItem(STORAGE_KEYS.experiences);
        if (experiencesData) {
            const experiences = JSON.parse(experiencesData);
            console.log(`📦 Found ${experiences.length} experiences in localStorage`);

            try {
                await experiencesService.batchUpsert(experiences);
                results.experiences.migrated = experiences.length;
                console.log(`✅ Migrated ${experiences.length} experiences`);
            } catch (error) {
                console.error('❌ Error migrating experiences:', error);
                results.experiences.errors++;
            }
        }

        // Migrate Certifications
        const certificationsData = localStorage.getItem(STORAGE_KEYS.certifications);
        if (certificationsData) {
            const certifications = JSON.parse(certificationsData);
            console.log(`📦 Found ${certifications.length} certifications in localStorage`);

            try {
                await certificationsService.batchUpsert(certifications);
                results.certifications.migrated = certifications.length;
                console.log(`✅ Migrated ${certifications.length} certifications`);
            } catch (error) {
                console.error('❌ Error migrating certifications:', error);
                results.certifications.errors++;
            }
        }

        // Migrate Leadership
        const leadershipData = localStorage.getItem(STORAGE_KEYS.leadership);
        if (leadershipData) {
            const leadership = JSON.parse(leadershipData);
            console.log(`📦 Found ${leadership.length} leadership items in localStorage`);

            try {
                await leadershipService.batchUpsert(leadership);
                results.leadership.migrated = leadership.length;
                console.log(`✅ Migrated ${leadership.length} leadership items`);
            } catch (error) {
                console.error('❌ Error migrating leadership:', error);
                results.leadership.errors++;
            }
        }

        // Migrate Messages
        const messagesData = localStorage.getItem(STORAGE_KEYS.messages);
        if (messagesData) {
            const messages = JSON.parse(messagesData);
            console.log(`📦 Found ${messages.length} messages in localStorage`);

            try {
                for (const message of messages) {
                    await messagesService.add(message);
                }
                results.messages.migrated = messages.length;
                console.log(`✅ Migrated ${messages.length} messages`);
            } catch (error) {
                console.error('❌ Error migrating messages:', error);
                results.messages.errors++;
            }
        }

        console.log('🎉 Migration complete!');
        console.log('📊 Results:', results);

        return {
            success: true,
            results
        };

    } catch (error) {
        console.error('❌ Migration failed:', error);
        return {
            success: false,
            error: error.message,
            results
        };
    }
};

/**
 * Check if localStorage has any data to migrate
 */
export const hasLocalStorageData = () => {
    const keys = Object.values(STORAGE_KEYS);
    return keys.some(key => localStorage.getItem(key) !== null);
};

/**
 * Clear localStorage after successful migration
 * WARNING: This will delete all local data!
 */
export const clearLocalStorage = () => {
    const keys = Object.values(STORAGE_KEYS);
    keys.forEach(key => localStorage.removeItem(key));
    console.log('🗑️ localStorage cleared');
};

/**
 * Export all data from database to JSON
 */
export const exportDatabaseData = async () => {
    if (!isDatabaseConfigured()) {
        throw new Error('Database not configured');
    }

    try {
        const [projects, skills, experiences, certifications, leadership, messages] = await Promise.all([
            projectsService.getAll(),
            skillsService.getAll(),
            experiencesService.getAll(),
            certificationsService.getAll(),
            leadershipService.getAll(),
            messagesService.getAll()
        ]);

        const exportData = {
            exportDate: new Date().toISOString(),
            projects,
            skills,
            experiences,
            certifications,
            leadership,
            messages
        };

        return exportData;
    } catch (error) {
        console.error('Error exporting data:', error);
        throw error;
    }
};
