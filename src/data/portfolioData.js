import { Code2, Database, Cloud, Cpu, Layers, Terminal, Zap, GitBranch, Globe, Boxes, FileCode, Braces } from 'lucide-react';

// Initial portfolio data
export const initialProjects = [
    {
        id: 1,
        title: "Faculty Management System (DevOps)",
        description: "Architected a cloud-native full-stack application with complete DevOps pipeline, automating deployment from code commit to production on Azure Kubernetes Service (AKS). Implemented multi-stage CI/CD using GitHub Actions with automated Selenium UI tests.",
        tech: ["Azure", "Kubernetes", "Docker", "Ansible", "GitHub Actions", "Selenium"],
        github: "#",
        demo: "#",
        year: "2024"
    },
    {
        id: 2,
        title: "Eventar – Smart QR Ticketing System",
        description: "Developed complete digital ticketing ecosystem for COMSATS Annual Dinner 2024, handling pass distribution for hundreds of attendees. Integrated Google Forms with payment gateways to auto-generate cryptographically secure QR code tickets.",
        tech: ["Node.js", "QR Generation", "Google Forms API", "Payment Gateway", "Security"],
        github: "#",
        demo: "#",
        year: "2024"
    },
    {
        id: 3,
        title: "AI-Based Custom Architecture Planner (FYP)",
        description: "Developing a Generative AI tool that autonomously generates blueprint layouts based on user preferences and area constraints. Implementing optimization algorithms for maximum space utilization and structural efficiency.",
        tech: ["Python", "Generative AI", "TensorFlow", "Optimization Algorithms", "Computer Vision"],
        github: "#",
        demo: "#",
        year: "2025"
    },
    {
        id: 4,
        title: "Computer Vision Traffic Systems",
        description: "Built real-time traffic light detection system identifying signal changes with high accuracy. Engineered heavy traffic counter using object detection contours to classify vehicles from live video feeds for density analysis.",
        tech: ["Python", "OpenCV", "Computer Vision", "Object Detection", "Real-time Processing"],
        github: "#",
        demo: "#",
        year: "2024"
    },
    {
        id: 5,
        title: "Student Exam Score Predictor",
        description: "Trained Linear Regression model to predict performance based on study hours and behavioral factors, achieving high accuracy. Conducted extensive EDA and visualizations to interpret results via MAE, RMSE, and R² metrics.",
        tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Data Visualization", "ML"],
        github: "#",
        demo: "#",
        year: "2024"
    },
    {
        id: 6,
        title: "Employee Management System",
        description: "Designed centralized digital portal to manage employee records, attendance, task assignments, and automated payroll calculations. Streamlined HR operations with intuitive interface and robust backend.",
        tech: ["React", "Node.js", "Express.js", "MongoDB", "REST API"],
        github: "#",
        demo: "#",
        year: "2023"
    }
];

export const initialSkills = [
    { name: "Python", icon: "Code2" },
    { name: "C++", icon: "Code2" },
    { name: "Java", icon: "Code2" },
    { name: "JavaScript", icon: "Code2" },
    { name: "SQL", icon: "Database" },
    { name: "HTML", icon: "FileCode" },
    { name: "Bash/Shell", icon: "Terminal" },
    { name: "PyTorch", icon: "Cpu" },
    { name: "TensorFlow", icon: "Cpu" },
    { name: "Scikit-learn", icon: "Cpu" },
    { name: "OpenCV", icon: "Cpu" },
    { name: "Pandas", icon: "Database" },
    { name: "NumPy", icon: "Database" },
    { name: "Kubernetes", icon: "Layers" },
    { name: "Docker", icon: "Boxes" },
    { name: "Ansible", icon: "Terminal" },
    { name: "GitHub Actions", icon: "GitBranch" },
    { name: "Azure", icon: "Cloud" },
    { name: "Selenium", icon: "Zap" },
    { name: "React", icon: "Globe" },
    { name: "Node.js", icon: "Terminal" },
    { name: "Express.js", icon: "Globe" },
    { name: "Git", icon: "GitBranch" },
    { name: "VS Code", icon: "Code2" },
    { name: "PyCharm", icon: "Code2" },
    { name: "JupyterLab", icon: "Code2" },
    { name: "Blender", icon: "Braces" },
];

export const initialExperiences = [
    {
        id: 1,
        title: "AI/ML Intern",
        company: "GAO Tek Inc.",
        location: "New York, USA (Remote)",
        period: "April 2024 – November 2024",
        description: "Engineered AI-driven, region-specific product screening algorithms and coordinated data preprocessing pipelines for large-scale datasets.",
        achievements: [
            "Engineered an AI-driven, region-specific product screening algorithm to identify market trends, optimizing the enlistment process for targeted demographics",
            "Coordinated data preprocessing pipelines, including cleaning, normalization, and visualization, to prepare large-scale datasets for downstream analysis",
            "Collaborated with cross-functional global teams to streamline project workflows, resulting in improved efficiency in task execution and delivery"
        ]
    }
];

export const initialCertifications = [
    {
        id: 1,
        title: "NVIDIA: AI Infrastructure and Operations",
        issuer: "NVIDIA",
        date: "2024",
        credentialUrl: "#",
    },
    {
        id: 2,
        title: "IBM: Python for Data Science, AI & Development",
        issuer: "IBM",
        date: "2024",
        credentialUrl: "#",
    },
    {
        id: 3,
        title: "IBM: Machine Learning with Python",
        issuer: "IBM",
        date: "2024",
        credentialUrl: "#",
    },
    {
        id: 4,
        title: "Google Cloud: Introduction to Generative AI",
        issuer: "Google Cloud",
        date: "2024",
        credentialUrl: "#",
    },
    {
        id: 5,
        title: "Cisco: CCNA - Introduction to Networks",
        issuer: "Cisco",
        date: "2023",
        credentialUrl: "#",
    },
    {
        id: 6,
        title: "Universal Robots: Risk Assessment Learning",
        issuer: "Universal Robots",
        date: "2023",
        credentialUrl: "#",
    }
];

export const initialLeadership = [
    {
        id: 1,
        title: "Director, Annual Dinner 2024",
        organization: "COMSATS University Islamabad",
        icon: "Award",
        description: "Led a team to organize a grand university gathering, managing logistics, budgeting, and execution for hundreds of attendees.",
        year: "2024"
    },
    {
        id: 2,
        title: "Cabinet Member",
        organization: "Youth Parliament Pakistan",
        icon: "Users",
        description: "Participated in youth governance initiatives and policy discussions, representing youth perspectives on national issues.",
        year: "2023"
    },
    {
        id: 3,
        title: "Campus Ambassador",
        organization: "COMPPEC, NUST (Tech Event)",
        icon: "Megaphone",
        description: "Promoted and coordinated tech event activities, engaging students and facilitating participation in technical competitions.",
        year: "2023"
    },
    {
        id: 4,
        title: "Organizer",
        organization: "UNICEF Awareness Drive & Shaukat Khanum Blood Donation",
        icon: "Heart",
        description: "Organized awareness campaigns and blood donation drives, contributing to social welfare and community health initiatives.",
        year: "2023"
    }
];
