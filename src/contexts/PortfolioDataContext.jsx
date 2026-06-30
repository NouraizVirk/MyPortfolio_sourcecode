import { createContext, useContext, useState, useEffect } from 'react';
import {
    dbService,
    projectsService,
    skillsService,
    experiencesService,
    certificationsService,
    leadershipService,
    messagesService
} from '../services/dbService';

const PortfolioDataContext = createContext(null);

export function PortfolioDataProvider({ children }) {
    const useDatabase = dbService.isAvailable();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [leadership, setLeadership] = useState([]);
    const [messages, setMessages] = useState([]);

    const ensureDatabase = () => {
        if (!useDatabase) {
            throw new Error('Database not configured. Configure DATABASE_URL in environment variables.');
        }
    };

    // Load data from database on mount
    useEffect(() => {
        const loadData = async () => {
            if (!useDatabase) {
                setError('Database not configured. Configure DATABASE_URL.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const pProjects = projectsService.getAll().then(setProjects);
                const pSkills = skillsService.getAll().then(setSkills);
                const pExperiences = experiencesService.getAll().then(setExperiences);
                const pCert = certificationsService.getAll().then(setCertifications);
                const pLeadership = leadershipService.getAll().then(setLeadership);
                const pMessages = messagesService.getAll().then(setMessages).catch(console.error);

                await Promise.allSettled([
                    pProjects, 
                    pSkills, 
                    pExperiences, 
                    pCert, 
                    pLeadership, 
                    pMessages
                ]);

                console.log('✅ Data loaded from database');
            } catch (err) {
                console.error('Error loading data from database:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [useDatabase]);

    const reorderList = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    // CRUD operations for projects
    const addProject = async (project) => {
        ensureDatabase();
        const newProject = { ...project, id: Date.now() };

        try {
            const result = await projectsService.add(newProject);
            setProjects(prev => [...prev, result]);
        } catch (err) {
            console.error('Error adding project:', err);
            throw err;
        }
    };

    const updateProject = async (id, updatedProject) => {
        ensureDatabase();
        try {
            await projectsService.update(id, updatedProject);
            setProjects(prev => prev.map(p => p.id === id ? { ...updatedProject, id } : p));
        } catch (err) {
            console.error('Error updating project:', err);
            throw err;
        }
    };

    const deleteProject = async (id) => {
        ensureDatabase();
        try {
            await projectsService.delete(id);
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error('Error deleting project:', err);
            throw err;
        }
    };

    const reorderProjects = async (startIndex, endIndex, options = { persist: true }) => {
        let previousProjects = [];
        let reorderedProjects = [];

        setProjects(prev => {
            previousProjects = prev;
            reorderedProjects = reorderList(prev, startIndex, endIndex);
            return reorderedProjects;
        });

        if (options.persist) {
            ensureDatabase();
            try {
                await projectsService.reorder(reorderedProjects.map((project) => project.id));
            } catch (err) {
                console.error('Error reordering projects:', err);
                setProjects(previousProjects);
                throw err;
            }
        }
    };

    const saveProjectsOrder = async () => {
        ensureDatabase();
        await projectsService.reorder(projects.map((project) => project.id));
    };

    // CRUD operations for skills
    const addSkill = async (skill) => {
        ensureDatabase();
        const newSkill = { ...skill, id: skill.name };

        try {
            const result = await skillsService.add(newSkill);
            setSkills(prev => [...prev, result]);
        } catch (err) {
            console.error('Error adding skill:', err);
            throw err;
        }
    };

    const deleteSkill = async (skillName) => {
        ensureDatabase();
        try {
            await skillsService.delete(skillName);
            setSkills(prev => prev.filter(s => s.name !== skillName));
        } catch (err) {
            console.error('Error deleting skill:', err);
            throw err;
        }
    };

    const reorderSkills = async (startIndex, endIndex, options = { persist: true }) => {
        let previousSkills = [];
        let reorderedSkills = [];

        setSkills(prev => {
            previousSkills = prev;
            reorderedSkills = reorderList(prev, startIndex, endIndex);
            return reorderedSkills;
        });

        if (options.persist) {
            ensureDatabase();
            try {
                await skillsService.reorder(reorderedSkills.map((skill) => skill.id));
            } catch (err) {
                console.error('Error reordering skills:', err);
                setSkills(previousSkills);
                throw err;
            }
        }
    };

    const saveSkillsOrder = async () => {
        ensureDatabase();
        await skillsService.reorder(skills.map((skill) => skill.id));
    };

    // CRUD operations for experiences
    const addExperience = async (experience) => {
        ensureDatabase();
        const newExperience = { ...experience, id: Date.now() };

        try {
            const result = await experiencesService.add(newExperience);
            setExperiences(prev => [...prev, result]);
        } catch (err) {
            console.error('Error adding experience:', err);
            throw err;
        }
    };

    const updateExperience = async (id, updatedExperience) => {
        ensureDatabase();
        try {
            await experiencesService.update(id, updatedExperience);
            setExperiences(prev => prev.map(e => e.id === id ? { ...updatedExperience, id } : e));
        } catch (err) {
            console.error('Error updating experience:', err);
            throw err;
        }
    };

    const deleteExperience = async (id) => {
        ensureDatabase();
        try {
            await experiencesService.delete(id);
            setExperiences(prev => prev.filter(e => e.id !== id));
        } catch (err) {
            console.error('Error deleting experience:', err);
            throw err;
        }
    };

    const reorderExperiences = async (startIndex, endIndex, options = { persist: true }) => {
        let previousExperiences = [];
        let reorderedExperiences = [];

        setExperiences(prev => {
            previousExperiences = prev;
            reorderedExperiences = reorderList(prev, startIndex, endIndex);
            return reorderedExperiences;
        });

        if (options.persist) {
            ensureDatabase();
            try {
                await experiencesService.reorder(reorderedExperiences.map((experience) => experience.id));
            } catch (err) {
                console.error('Error reordering experiences:', err);
                setExperiences(previousExperiences);
                throw err;
            }
        }
    };

    const saveExperiencesOrder = async () => {
        ensureDatabase();
        await experiencesService.reorder(experiences.map((experience) => experience.id));
    };

    // CRUD operations for certifications
    const addCertification = async (certification) => {
        ensureDatabase();
        const newCert = { ...certification, id: Date.now() };

        try {
            const result = await certificationsService.add(newCert);
            setCertifications(prev => [...prev, result]);
        } catch (err) {
            console.error('Error adding certification:', err);
            throw err;
        }
    };

    const updateCertification = async (id, updatedCert) => {
        ensureDatabase();
        try {
            await certificationsService.update(id, updatedCert);
            setCertifications(prev => prev.map(c => c.id === id ? { ...updatedCert, id } : c));
        } catch (err) {
            console.error('Error updating certification:', err);
            throw err;
        }
    };

    const deleteCertification = async (id) => {
        ensureDatabase();
        try {
            await certificationsService.delete(id);
            setCertifications(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            console.error('Error deleting certification:', err);
            throw err;
        }
    };

    const reorderCertifications = async (startIndex, endIndex, options = { persist: true }) => {
        let previousCertifications = [];
        let reorderedCertifications = [];

        setCertifications(prev => {
            previousCertifications = prev;
            reorderedCertifications = reorderList(prev, startIndex, endIndex);
            return reorderedCertifications;
        });

        if (options.persist) {
            ensureDatabase();
            try {
                await certificationsService.reorder(reorderedCertifications.map((certification) => certification.id));
            } catch (err) {
                console.error('Error reordering certifications:', err);
                setCertifications(previousCertifications);
                throw err;
            }
        }
    };

    const saveCertificationsOrder = async () => {
        ensureDatabase();
        await certificationsService.reorder(certifications.map((certification) => certification.id));
    };

    // CRUD operations for leadership
    const addLeadership = async (item) => {
        ensureDatabase();
        const newItem = { ...item, id: Date.now() };

        try {
            const result = await leadershipService.add(newItem);
            setLeadership(prev => [...prev, result]);
        } catch (err) {
            console.error('Error adding leadership:', err);
            throw err;
        }
    };

    const updateLeadership = async (id, updatedItem) => {
        ensureDatabase();
        try {
            await leadershipService.update(id, updatedItem);
            setLeadership(prev => prev.map(l => l.id === id ? { ...updatedItem, id } : l));
        } catch (err) {
            console.error('Error updating leadership:', err);
            throw err;
        }
    };

    const deleteLeadership = async (id) => {
        ensureDatabase();
        try {
            await leadershipService.delete(id);
            setLeadership(prev => prev.filter(l => l.id !== id));
        } catch (err) {
            console.error('Error deleting leadership:', err);
            throw err;
        }
    };

    const reorderLeadership = async (startIndex, endIndex, options = { persist: true }) => {
        let previousLeadership = [];
        let reorderedLeadership = [];

        setLeadership(prev => {
            previousLeadership = prev;
            reorderedLeadership = reorderList(prev, startIndex, endIndex);
            return reorderedLeadership;
        });

        if (options.persist) {
            ensureDatabase();
            try {
                await leadershipService.reorder(reorderedLeadership.map((item) => item.id));
            } catch (err) {
                console.error('Error reordering leadership:', err);
                setLeadership(previousLeadership);
                throw err;
            }
        }
    };

    const saveLeadershipOrder = async () => {
        ensureDatabase();
        await leadershipService.reorder(leadership.map((item) => item.id));
    };

    // CRUD operations for messages
    const addMessage = async (message) => {
        ensureDatabase();
        const newMessage = {
            ...message,
            id: `msg_${Date.now()}`,
            timestamp: new Date().toISOString(),
            read: false
        };

        try {
            const result = await messagesService.add(newMessage);
            setMessages(prev => [result, ...prev]);
        } catch (err) {
            console.error('Error adding message:', err);
            throw err;
        }
    };

    const markMessageAsRead = async (id) => {
        ensureDatabase();
        try {
            await messagesService.update(id, { read: true });
            setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
        } catch (err) {
            console.error('Error marking message as read:', err);
            throw err;
        }
    };

    const deleteMessage = async (id) => {
        ensureDatabase();
        try {
            await messagesService.delete(id);
            setMessages(prev => prev.filter(m => m.id !== id));
        } catch (err) {
            console.error('Error deleting message:', err);
            throw err;
        }
    };

    const portfolioData = {
        // Data
        projects,
        skills,
        experiences,
        certifications,
        leadership,
        messages,
        // Meta
        loading,
        error,
        useDatabase,
        // Projects
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        saveProjectsOrder,
        // Skills
        addSkill,
        deleteSkill,
        reorderSkills,
        saveSkillsOrder,
        // Experiences
        addExperience,
        updateExperience,
        deleteExperience,
        reorderExperiences,
        saveExperiencesOrder,
        // Certifications
        addCertification,
        updateCertification,
        deleteCertification,
        reorderCertifications,
        saveCertificationsOrder,
        // Leadership
        addLeadership,
        updateLeadership,
        deleteLeadership,
        reorderLeadership,
        saveLeadershipOrder,
        // Messages
        addMessage,
        markMessageAsRead,
        deleteMessage,
    };

    return (
        <PortfolioDataContext.Provider value={portfolioData}>
            {children}
        </PortfolioDataContext.Provider>
    );
}

export function usePortfolioData() {
    const context = useContext(PortfolioDataContext);
    if (!context) {
        throw new Error('usePortfolioData must be used within PortfolioDataProvider');
    }
    return context;
}
