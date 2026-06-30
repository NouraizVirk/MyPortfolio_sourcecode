import { useState, useEffect } from 'react';
import { initialProjects, initialSkills, initialExperiences, initialCertifications, initialLeadership } from '../data/portfolioData';

const STORAGE_KEYS = {
    projects: 'portfolio_projects',
    skills: 'portfolio_skills',
    experiences: 'portfolio_experiences',
    certifications: 'portfolio_certifications',
    leadership: 'portfolio_leadership'
};

export function usePortfolioData() {
    const [projects, setProjects] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.projects);
        return saved ? JSON.parse(saved) : initialProjects;
    });

    const [skills, setSkills] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.skills);
        return saved ? JSON.parse(saved) : initialSkills;
    });

    const [experiences, setExperiences] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.experiences);
        return saved ? JSON.parse(saved) : initialExperiences;
    });

    const [certifications, setCertifications] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.certifications);
        return saved ? JSON.parse(saved) : initialCertifications;
    });

    const [leadership, setLeadership] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.leadership);
        return saved ? JSON.parse(saved) : initialLeadership;
    });

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
    }, [projects]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.skills, JSON.stringify(skills));
    }, [skills]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.experiences, JSON.stringify(experiences));
    }, [experiences]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.certifications, JSON.stringify(certifications));
    }, [certifications]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.leadership, JSON.stringify(leadership));
    }, [leadership]);

    // CRUD operations for projects
    const addProject = (project) => {
        const newProject = { ...project, id: Date.now() };
        setProjects([...projects, newProject]);
    };

    const updateProject = (id, updatedProject) => {
        setProjects(projects.map(p => p.id === id ? { ...updatedProject, id } : p));
    };

    const deleteProject = (id) => {
        setProjects(projects.filter(p => p.id !== id));
    };

    // CRUD operations for skills
    const addSkill = (skill) => {
        setSkills([...skills, skill]);
    };

    const deleteSkill = (skillName) => {
        console.log('Deleting skill:', skillName);
        console.log('Current skills:', skills);
        const newSkills = skills.filter(s => s.name !== skillName);
        console.log('New skills after filter:', newSkills);
        setSkills(newSkills);
    };

    // CRUD operations for experiences
    const addExperience = (experience) => {
        const newExperience = { ...experience, id: Date.now() };
        setExperiences([...experiences, newExperience]);
    };

    const updateExperience = (id, updatedExperience) => {
        setExperiences(experiences.map(e => e.id === id ? { ...updatedExperience, id } : e));
    };

    const deleteExperience = (id) => {
        setExperiences(experiences.filter(e => e.id !== id));
    };

    // CRUD operations for certifications
    const addCertification = (certification) => {
        const newCert = { ...certification, id: Date.now() };
        setCertifications([...certifications, newCert]);
    };

    const updateCertification = (id, updatedCert) => {
        setCertifications(certifications.map(c => c.id === id ? { ...updatedCert, id } : c));
    };

    const deleteCertification = (id) => {
        setCertifications(certifications.filter(c => c.id !== id));
    };

    // CRUD operations for leadership
    const addLeadership = (item) => {
        const newItem = { ...item, id: Date.now() };
        setLeadership([...leadership, newItem]);
    };

    const updateLeadership = (id, updatedItem) => {
        setLeadership(leadership.map(l => l.id === id ? { ...updatedItem, id } : l));
    };

    const deleteLeadership = (id) => {
        setLeadership(leadership.filter(l => l.id !== id));
    };

    return {
        // Data
        projects,
        skills,
        experiences,
        certifications,
        leadership,
        // Projects
        addProject,
        updateProject,
        deleteProject,
        // Skills
        addSkill,
        deleteSkill,
        // Experiences
        addExperience,
        updateExperience,
        deleteExperience,
        // Certifications
        addCertification,
        updateCertification,
        deleteCertification,
        // Leadership
        addLeadership,
        updateLeadership,
        deleteLeadership,
    };
}
