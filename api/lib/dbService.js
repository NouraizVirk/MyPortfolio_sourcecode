import { sql, isDatabaseConfigured } from './db.config.js';

const orderColumnReady = new Set();

const ensureSortOrderColumn = async (table) => {
    if (orderColumnReady.has(table)) return;

    switch (table) {
        case 'projects':
            await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS sort_order INTEGER`;
            break;
        case 'skills':
            await sql`ALTER TABLE skills ADD COLUMN IF NOT EXISTS sort_order INTEGER`;
            break;
        case 'experiences':
            await sql`ALTER TABLE experiences ADD COLUMN IF NOT EXISTS sort_order INTEGER`;
            break;
        case 'certifications':
            await sql`ALTER TABLE certifications ADD COLUMN IF NOT EXISTS sort_order INTEGER`;
            break;
        case 'leadership':
            await sql`ALTER TABLE leadership ADD COLUMN IF NOT EXISTS sort_order INTEGER`;
            break;
        default:
            throw new Error(`Unsupported table for ordering: ${table}`);
    }

    orderColumnReady.add(table);
};

const getNextSortOrder = async (table) => {
    await ensureSortOrderColumn(table);

    switch (table) {
        case 'projects': {
            const rows = await sql`SELECT COALESCE(MAX(sort_order), -1) + 1 AS next_order FROM projects`;
            return rows[0].next_order;
        }
        case 'skills': {
            const rows = await sql`SELECT COALESCE(MAX(sort_order), -1) + 1 AS next_order FROM skills`;
            return rows[0].next_order;
        }
        case 'experiences': {
            const rows = await sql`SELECT COALESCE(MAX(sort_order), -1) + 1 AS next_order FROM experiences`;
            return rows[0].next_order;
        }
        case 'certifications': {
            const rows = await sql`SELECT COALESCE(MAX(sort_order), -1) + 1 AS next_order FROM certifications`;
            return rows[0].next_order;
        }
        case 'leadership': {
            const rows = await sql`SELECT COALESCE(MAX(sort_order), -1) + 1 AS next_order FROM leadership`;
            return rows[0].next_order;
        }
        default:
            throw new Error(`Unsupported table for ordering: ${table}`);
    }
};

// Database service for Neon PostgreSQL using tagged template literals
export const dbService = {
    // Check if database is available
    isAvailable: () => isDatabaseConfigured() && sql !== null,

    // Projects
    projects: {
        getAll: async () => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('projects');
            return await sql`SELECT * FROM projects ORDER BY sort_order NULLS LAST, id`;
        },

        add: async (project) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            const { id, title, description, tech, github, demo, year, images = [] } = project;
            const sortOrder = await getNextSortOrder('projects');
            const result = await sql`
                INSERT INTO projects (id, title, description, tech, github, demo, year, images, sort_order) 
                VALUES (${id}, ${title}, ${description}, ${tech}, ${github}, ${demo}, ${year}, ${images}, ${sortOrder}) 
                RETURNING *
            `;
            return result[0];
        },

        update: async (id, project) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            const { title, description, tech, github, demo, year, images = [] } = project;
            const result = await sql`
                UPDATE projects 
                SET title = ${title}, 
                    description = ${description}, 
                    tech = ${tech}, 
                    github = ${github}, 
                    demo = ${demo}, 
                    year = ${year}, 
                    images = ${images}, 
                    updated_at = NOW() 
                WHERE id = ${id} 
                RETURNING *
            `;
            return result[0];
        },

        delete: async (id) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await sql`DELETE FROM projects WHERE id = ${id}`;
            return true;
        },

        batchUpsert: async (projects) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('projects');
            for (const [index, project] of projects.entries()) {
                await sql`
                    INSERT INTO projects (id, title, description, tech, github, demo, year, images, sort_order) 
                    VALUES (${project.id}, ${project.title}, ${project.description}, ${project.tech}, ${project.github}, ${project.demo}, ${project.year}, ${project.images || []}, ${index}) 
                    ON CONFLICT (id) DO UPDATE SET 
                        title = EXCLUDED.title, 
                        description = EXCLUDED.description, 
                        tech = EXCLUDED.tech, 
                        github = EXCLUDED.github, 
                        demo = EXCLUDED.demo, 
                        year = EXCLUDED.year, 
                        images = EXCLUDED.images,
                        sort_order = EXCLUDED.sort_order,
                        updated_at = NOW()
                `;
            }
            return projects;
        },

        reorder: async (projectIds) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('projects');

            await Promise.all(
                projectIds.map((id, index) =>
                    sql`
                        UPDATE projects
                        SET sort_order = ${index}, updated_at = NOW()
                        WHERE id = ${id}
                    `
                )
            );

            return true;
        }
    },

    // Skills
    skills: {
        getAll: async () => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('skills');
            return await sql`SELECT * FROM skills ORDER BY sort_order NULLS LAST, id`;
        },

        add: async (skill) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            const { id, name, icon } = skill;
            const sortOrder = await getNextSortOrder('skills');
            const result = await sql`
                INSERT INTO skills (id, name, icon, sort_order) 
                VALUES (${id}, ${name}, ${icon}, ${sortOrder}) 
                RETURNING *
            `;
            return result[0];
        },

        delete: async (id) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await sql`DELETE FROM skills WHERE id = ${id}`;
            return true;
        },

        batchUpsert: async (skills) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('skills');
            for (const [index, skill] of skills.entries()) {
                await sql`
                    INSERT INTO skills (id, name, icon, sort_order) 
                    VALUES (${skill.id}, ${skill.name}, ${skill.icon}, ${index}) 
                    ON CONFLICT (id) DO UPDATE SET 
                        name = EXCLUDED.name, 
                        icon = EXCLUDED.icon,
                        sort_order = EXCLUDED.sort_order
                `;
            }
            return skills;
        },

        reorder: async (skillIds) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('skills');

            await Promise.all(
                skillIds.map((id, index) =>
                    sql`
                        UPDATE skills
                        SET sort_order = ${index}
                        WHERE id = ${id}
                    `
                )
            );

            return true;
        }
    },

    // Experiences
    experiences: {
        getAll: async () => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('experiences');
            return await sql`SELECT * FROM experiences ORDER BY sort_order NULLS LAST, id`;
        },

        add: async (experience) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            const { id, title, company, location, period, description, achievements } = experience;
            const sortOrder = await getNextSortOrder('experiences');
            const result = await sql`
                INSERT INTO experiences (id, title, company, location, period, description, achievements, sort_order) 
                VALUES (${id}, ${title}, ${company}, ${location}, ${period}, ${description}, ${achievements}, ${sortOrder}) 
                RETURNING *
            `;
            return result[0];
        },

        update: async (id, experience) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            const { title, company, location, period, description, achievements } = experience;
            const result = await sql`
                UPDATE experiences 
                SET title = ${title}, 
                    company = ${company}, 
                    location = ${location}, 
                    period = ${period}, 
                    description = ${description}, 
                    achievements = ${achievements}, 
                    updated_at = NOW() 
                WHERE id = ${id} 
                RETURNING *
            `;
            return result[0];
        },

        delete: async (id) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await sql`DELETE FROM experiences WHERE id = ${id}`;
            return true;
        },

        batchUpsert: async (experiences) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('experiences');
            for (const [index, exp] of experiences.entries()) {
                await sql`
                    INSERT INTO experiences (id, title, company, location, period, description, achievements, sort_order) 
                    VALUES (${exp.id}, ${exp.title}, ${exp.company}, ${exp.location}, ${exp.period}, ${exp.description}, ${exp.achievements}, ${index}) 
                    ON CONFLICT (id) DO UPDATE SET 
                        title = EXCLUDED.title, 
                        company = EXCLUDED.company, 
                        location = EXCLUDED.location, 
                        period = EXCLUDED.period, 
                        description = EXCLUDED.description, 
                        achievements = EXCLUDED.achievements,
                        sort_order = EXCLUDED.sort_order,
                        updated_at = NOW()
                `;
            }
            return experiences;
        },

        reorder: async (experienceIds) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('experiences');

            await Promise.all(
                experienceIds.map((id, index) =>
                    sql`
                        UPDATE experiences
                        SET sort_order = ${index}, updated_at = NOW()
                        WHERE id = ${id}
                    `
                )
            );

            return true;
        }
    },

    // Certifications
    certifications: {
        getAll: async () => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('certifications');
            const rows = await sql`SELECT * FROM certifications ORDER BY sort_order NULLS LAST, id`;
            // Map snake_case DB column to camelCase used by frontend
            return rows.map(row => ({
                ...row,
                credentialUrl: row.credential_url,
            }));
        },

        add: async (cert) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            const { id, title, issuer, date, credentialUrl } = cert;
            const sortOrder = await getNextSortOrder('certifications');
            const result = await sql`
                INSERT INTO certifications (id, title, issuer, date, credential_url, sort_order) 
                VALUES (${id}, ${title}, ${issuer}, ${date}, ${credentialUrl}, ${sortOrder}) 
                RETURNING *
            `;
            return { ...result[0], credentialUrl: result[0].credential_url };
        },

        update: async (id, cert) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            const { title, issuer, date, credentialUrl } = cert;
            const result = await sql`
                UPDATE certifications 
                SET title = ${title}, 
                    issuer = ${issuer}, 
                    date = ${date}, 
                    credential_url = ${credentialUrl}, 
                    updated_at = NOW() 
                WHERE id = ${id} 
                RETURNING *
            `;
            return { ...result[0], credentialUrl: result[0].credential_url };
        },

        delete: async (id) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await sql`DELETE FROM certifications WHERE id = ${id}`;
            return true;
        },

        batchUpsert: async (certifications) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('certifications');
            for (const [index, cert] of certifications.entries()) {
                await sql`
                    INSERT INTO certifications (id, title, issuer, date, credential_url, sort_order) 
                    VALUES (${cert.id}, ${cert.title}, ${cert.issuer}, ${cert.date}, ${cert.credentialUrl || cert.credential_url}, ${index}) 
                    ON CONFLICT (id) DO UPDATE SET 
                        title = EXCLUDED.title, 
                        issuer = EXCLUDED.issuer, 
                        date = EXCLUDED.date, 
                        credential_url = EXCLUDED.credential_url,
                        sort_order = EXCLUDED.sort_order,
                        updated_at = NOW()
                `;
            }
            return certifications;
        },

        reorder: async (certificationIds) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('certifications');

            await Promise.all(
                certificationIds.map((id, index) =>
                    sql`
                        UPDATE certifications
                        SET sort_order = ${index}, updated_at = NOW()
                        WHERE id = ${id}
                    `
                )
            );

            return true;
        }
    },

    // Leadership
    leadership: {
        getAll: async () => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('leadership');
            return await sql`SELECT * FROM leadership ORDER BY sort_order NULLS LAST, id`;
        },

        add: async (item) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            const { id, title, organization, icon, description, year } = item;
            const sortOrder = await getNextSortOrder('leadership');
            const result = await sql`
                INSERT INTO leadership (id, title, organization, icon, description, year, sort_order) 
                VALUES (${id}, ${title}, ${organization}, ${icon}, ${description}, ${year}, ${sortOrder}) 
                RETURNING *
            `;
            return result[0];
        },

        update: async (id, item) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            const { title, organization, icon, description, year } = item;
            const result = await sql`
                UPDATE leadership 
                SET title = ${title}, 
                    organization = ${organization}, 
                    icon = ${icon}, 
                    description = ${description}, 
                    year = ${year}, 
                    updated_at = NOW() 
                WHERE id = ${id} 
                RETURNING *
            `;
            return result[0];
        },

        delete: async (id) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await sql`DELETE FROM leadership WHERE id = ${id}`;
            return true;
        },

        batchUpsert: async (leadership) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('leadership');
            for (const [index, item] of leadership.entries()) {
                await sql`
                    INSERT INTO leadership (id, title, organization, icon, description, year, sort_order) 
                    VALUES (${item.id}, ${item.title}, ${item.organization}, ${item.icon}, ${item.description}, ${item.year}, ${index}) 
                    ON CONFLICT (id) DO UPDATE SET 
                        title = EXCLUDED.title, 
                        organization = EXCLUDED.organization, 
                        icon = EXCLUDED.icon, 
                        description = EXCLUDED.description, 
                        year = EXCLUDED.year,
                        sort_order = EXCLUDED.sort_order,
                        updated_at = NOW()
                `;
            }
            return leadership;
        },

        reorder: async (leadershipIds) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await ensureSortOrderColumn('leadership');

            await Promise.all(
                leadershipIds.map((id, index) =>
                    sql`
                        UPDATE leadership
                        SET sort_order = ${index}, updated_at = NOW()
                        WHERE id = ${id}
                    `
                )
            );

            return true;
        }
    },

    // Messages
    messages: {
        getAll: async () => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            return await sql`SELECT * FROM messages ORDER BY timestamp DESC`;
        },

        add: async (message) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            const { id, name, email, message: msg, timestamp, read } = message;
            const result = await sql`
                INSERT INTO messages (id, name, email, message, timestamp, read) 
                VALUES (${id}, ${name}, ${email}, ${msg}, ${timestamp}, ${read}) 
                RETURNING *
            `;
            return result[0];
        },

        update: async (id, message) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            const { read } = message;
            const result = await sql`
                UPDATE messages 
                SET read = ${read} 
                WHERE id = ${id} 
                RETURNING *
            `;
            return result[0];
        },

        delete: async (id) => {
            if (!dbService.isAvailable()) throw new Error('Database not configured');
            await sql`DELETE FROM messages WHERE id = ${id}`;
            return true;
        }
    }
};

// Export individual services for convenience
export const projectsService = dbService.projects;
export const skillsService = dbService.skills;
export const experiencesService = dbService.experiences;
export const certificationsService = dbService.certifications;
export const leadershipService = dbService.leadership;
export const messagesService = dbService.messages;
