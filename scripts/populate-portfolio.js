import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is not set in the environment');

const sql = neon(databaseUrl);

async function populateDatabase() {
    console.log('🚀 Populating database with portfolio data...\n');

    try {
        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await sql`DELETE FROM projects`;
        await sql`DELETE FROM skills`;
        await sql`DELETE FROM experiences`;
        await sql`DELETE FROM certifications`;
        await sql`DELETE FROM leadership`;
        console.log('✅ Existing data cleared\n');

        // ========== PROJECTS ==========
        console.log('📦 Adding Projects...');
        const projects = [
            {
                id: 1,
                title: 'Faculty Management System (DevOps)',
                description: 'Architected a cloud-native full-stack application with complete DevOps pipeline, automating deployment from code commit to production on Azure Kubernetes Service (AKS). Implemented multi-stage CI/CD using GitHub Actions with automated Selenium UI tests.',
                tech: ['Azure', 'Kubernetes', 'Docker', 'Ansible', 'GitHub Actions', 'Selenium'],
                github: 'https://github.com',
                demo: 'https://demo.com',
                year: '2024',
                images: []
            },
            {
                id: 2,
                title: 'Eventar – Smart QR Ticketing System',
                description: 'Developed complete digital ticketing ecosystem for COMSATS Annual Dinner 2024, handling pass distribution for hundreds of attendees. Integrated Google Forms with payment gateways to auto-generate cryptographically secure QR code tickets.',
                tech: ['Node.js', 'QR Generation', 'Google Forms API', 'Payment Gateway', 'Security'],
                github: 'https://github.com',
                demo: 'https://demo.com',
                year: '2024',
                images: []
            },
            {
                id: 3,
                title: 'AI-Based Custom Architecture Planner (FYP)',
                description: 'Developing a Generative AI tool that autonomously generates blueprint layouts based on user preferences and area constraints. Implementing optimization algorithms for maximum space utilization and structural efficiency.',
                tech: ['Python', 'Generative AI', 'TensorFlow', 'Optimization Algorithms', 'Computer Vision'],
                github: 'https://github.com',
                demo: 'https://demo.com',
                year: '2025',
                images: []
            },
            {
                id: 4,
                title: 'Computer Vision Traffic Systems',
                description: 'Built real-time traffic light detection system identifying signal changes with high accuracy. Engineered heavy traffic counter using object detection contours to classify vehicles from live video feeds for density analysis.',
                tech: ['Python', 'OpenCV', 'Computer Vision', 'Object Detection', 'Real-time Processing'],
                github: 'https://github.com',
                demo: 'https://demo.com',
                year: '2024',
                images: []
            },
            {
                id: 5,
                title: 'Student Exam Score Predictor',
                description: 'Built and trained a Linear Regression model to predict student performance based on study hours and behavioral factors. Conducted extensive Exploratory Data Analysis (EDA) to visualize correlations.',
                tech: ['Python', 'Scikit-Learn', 'Pandas', 'Data Analysis'],
                github: 'https://github.com',
                demo: 'https://demo.com',
                year: '2024',
                images: []
            },
            {
                id: 6,
                title: 'Employee Management System',
                description: 'Designed a centralized management portal to digitize employee records, automating payroll calculations, attendance tracking, and task assignment workflows.',
                tech: ['Database Design', 'Software Engineering'],
                github: 'https://github.com',
                demo: 'https://demo.com',
                year: '2023',
                images: []
            },
            {
                id: 7,
                title: 'Animated Short (Computer Graphics)',
                description: 'Created a 1-minute animated short awarded "Best Project" in the Computer Graphics course.',
                tech: ['Blender', 'Computer Graphics'],
                github: 'https://github.com',
                demo: 'https://demo.com',
                year: '2023',
                images: []
            }
        ];

        for (const project of projects) {
            await sql`
                INSERT INTO projects (id, title, description, tech, github, demo, year, images)
                VALUES (${project.id}, ${project.title}, ${project.description}, ${project.tech}, ${project.github}, ${project.demo}, ${project.year}, ${project.images})
            `;
        }
        console.log(`✅ Added ${projects.length} projects\n`);

        // ========== SKILLS ==========
        console.log('🛠️  Adding Skills...');
        const skills = [
            { id: 'python', name: 'Python', icon: 'Code' },
            { id: 'cpp', name: 'C++', icon: 'Code' },
            { id: 'java', name: 'Java', icon: 'Code' },
            { id: 'sql', name: 'SQL', icon: 'Database' },
            { id: 'javascript', name: 'JavaScript', icon: 'Code' },
            { id: 'html', name: 'HTML', icon: 'Code' },
            { id: 'bash', name: 'Bash/Shell', icon: 'Terminal' },
            { id: 'pytorch', name: 'PyTorch', icon: 'Brain' },
            { id: 'tensorflow', name: 'TensorFlow', icon: 'Brain' },
            { id: 'sklearn', name: 'Scikit-learn', icon: 'Brain' },
            { id: 'opencv', name: 'OpenCV', icon: 'Eye' },
            { id: 'pandas', name: 'Pandas', icon: 'Database' },
            { id: 'numpy', name: 'NumPy', icon: 'Calculator' },
            { id: 'kubernetes', name: 'Kubernetes', icon: 'Cloud' },
            { id: 'ansible', name: 'Ansible', icon: 'Settings' },
            { id: 'docker', name: 'Docker', icon: 'Package' },
            { id: 'azure', name: 'Microsoft Azure', icon: 'Cloud' },
            { id: 'cicd', name: 'CI/CD', icon: 'GitBranch' },
            { id: 'react', name: 'React', icon: 'Code' },
            { id: 'nodejs', name: 'Node.js', icon: 'Server' },
            { id: 'express', name: 'Express.js', icon: 'Server' },
            { id: 'git', name: 'Git', icon: 'GitBranch' }
        ];

        for (const skill of skills) {
            await sql`
                INSERT INTO skills (id, name, icon)
                VALUES (${skill.id}, ${skill.name}, ${skill.icon})
            `;
        }
        console.log(`✅ Added ${skills.length} skills\n`);

        // ========== EXPERIENCE ==========
        console.log('💼 Adding Experience...');
        const experiences = [
            {
                id: 1,
                title: 'AI/ML Intern (Remote)',
                company: 'GAO Tek Inc.',
                location: 'New York, USA',
                period: 'April 2025 – November 2025',
                description: 'Engineered AI-driven, region-specific product screening algorithms and coordinated data preprocessing pipelines for machine learning analysis.',
                achievements: [
                    'Engineered an AI-driven, region-specific product screening algorithm to identify market trends',
                    'Coordinated data preprocessing pipelines including cleaning, normalization, and visualization',
                    'Collaborated with cross-functional global teams to streamline project workflows'
                ]
            }
        ];

        for (const exp of experiences) {
            await sql`
                INSERT INTO experiences (id, title, company, location, period, description, achievements)
                VALUES (${exp.id}, ${exp.title}, ${exp.company}, ${exp.location}, ${exp.period}, ${exp.description}, ${exp.achievements})
            `;
        }
        console.log(`✅ Added ${experiences.length} experience(s)\n`);

        // ========== CERTIFICATIONS ==========
        console.log('🎓 Adding Certifications...');
        const certifications = [
            { id: 1, title: 'AI Infrastructure and Operations', issuer: 'NVIDIA', date: '2024', credential_url: '' },
            { id: 2, title: 'Python for Data Science, AI & Development', issuer: 'IBM', date: '2024', credential_url: '' },
            { id: 3, title: 'Machine Learning with Python', issuer: 'IBM', date: '2024', credential_url: '' },
            { id: 4, title: 'Introduction to Generative AI', issuer: 'Google Cloud Skills Boost', date: '2024', credential_url: '' },
            { id: 5, title: 'CCNA: Introduction to Networks', issuer: 'Cisco', date: '2023', credential_url: '' },
            { id: 6, title: 'Risk Assessment Learning', issuer: 'Universal Robots', date: '2023', credential_url: '' },
            { id: 7, title: 'UR20/30 Learning', issuer: 'Universal Robots', date: '2023', credential_url: '' },
            { id: 8, title: 'English for Career Development', issuer: 'OPEN', date: '2023', credential_url: '' }
        ];

        for (const cert of certifications) {
            await sql`
                INSERT INTO certifications (id, title, issuer, date, credential_url)
                VALUES (${cert.id}, ${cert.title}, ${cert.issuer}, ${cert.date}, ${cert.credential_url})
            `;
        }
        console.log(`✅ Added ${certifications.length} certifications\n`);

        // ========== LEADERSHIP ==========
        console.log('👥 Adding Leadership & Volunteer Work...');
        const leadership = [
            {
                id: 1,
                title: 'Director, Annual Dinner 2024',
                organization: 'COMSATS',
                icon: 'Users',
                description: 'Elected to lead the organization of a grand university gathering, managing logistics, budgeting, and execution to foster unity among students and alumni.',
                year: '2024'
            },
            {
                id: 2,
                title: 'Cabinet Member',
                organization: 'Youth Parliament Pakistan',
                icon: 'Award',
                description: 'Engaged in social work and community development initiatives.',
                year: '2023'
            },
            {
                id: 3,
                title: 'Organizer, Blood Donation Drive',
                organization: 'Shaukat Khanum Hospital',
                icon: 'Heart',
                description: 'Organized a blood donation drive for Shaukat Khanum Hospital.',
                year: '2023'
            },
            {
                id: 4,
                title: 'Campus Ambassador',
                organization: 'COMPPEC (NUST)',
                icon: 'Flag',
                description: 'Served as an ambassador for a major tech event at NUST.',
                year: '2023'
            },
            {
                id: 5,
                title: 'Organizer, UNICEF Awareness Drive',
                organization: 'UNICEF',
                icon: 'Globe',
                description: 'Participated in social work campaigns raising awareness for UNICEF causes.',
                year: '2023'
            }
        ];

        for (const item of leadership) {
            await sql`
                INSERT INTO leadership (id, title, organization, icon, description, year)
                VALUES (${item.id}, ${item.title}, ${item.organization}, ${item.icon}, ${item.description}, ${item.year})
            `;
        }
        console.log(`✅ Added ${leadership.length} leadership roles\n`);

        console.log('🎉 Database population complete!\n');
        console.log('📊 Summary:');
        console.log(`   - ${projects.length} Projects`);
        console.log(`   - ${skills.length} Skills`);
        console.log(`   - ${experiences.length} Experience(s)`);
        console.log(`   - ${certifications.length} Certifications`);
        console.log(`   - ${leadership.length} Leadership Roles`);
        console.log('\n✅ Your portfolio is now live! Refresh your browser to see all the data.');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

populateDatabase();
