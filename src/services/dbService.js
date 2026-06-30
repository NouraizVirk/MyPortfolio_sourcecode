// RPC Client helper
export const rpc = async (action, ...args) => {
    const adminPassword = localStorage.getItem('adminPassword');
    
    const headers = {
        'Content-Type': 'application/json'
    };
    if (adminPassword) {
        headers['x-admin-password'] = adminPassword;
    }

    const response = await fetch('/api/rpc', {
        method: 'POST',
        headers,
        body: JSON.stringify({ action, args })
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error || 'RPC request failed');
    }

    return data;
};

export const dbService = {
    isAvailable: () => true, // Assume true, backend handles actual connection

    projects: {
        getAll: () => rpc('projects.getAll'),
        add: (project) => rpc('projects.add', project),
        update: (id, project) => rpc('projects.update', id, project),
        delete: (id) => rpc('projects.delete', id),
        batchUpsert: (projects) => rpc('projects.batchUpsert', projects),
        reorder: (projectIds) => rpc('projects.reorder', projectIds)
    },

    skills: {
        getAll: () => rpc('skills.getAll'),
        add: (skill) => rpc('skills.add', skill),
        delete: (id) => rpc('skills.delete', id),
        batchUpsert: (skills) => rpc('skills.batchUpsert', skills),
        reorder: (skillIds) => rpc('skills.reorder', skillIds)
    },

    experiences: {
        getAll: () => rpc('experiences.getAll'),
        add: (experience) => rpc('experiences.add', experience),
        update: (id, experience) => rpc('experiences.update', id, experience),
        delete: (id) => rpc('experiences.delete', id),
        batchUpsert: (experiences) => rpc('experiences.batchUpsert', experiences),
        reorder: (experienceIds) => rpc('experiences.reorder', experienceIds)
    },

    certifications: {
        getAll: () => rpc('certifications.getAll'),
        add: (cert) => rpc('certifications.add', cert),
        update: (id, cert) => rpc('certifications.update', id, cert),
        delete: (id) => rpc('certifications.delete', id),
        batchUpsert: (certifications) => rpc('certifications.batchUpsert', certifications),
        reorder: (certificationIds) => rpc('certifications.reorder', certificationIds)
    },

    leadership: {
        getAll: () => rpc('leadership.getAll'),
        add: (item) => rpc('leadership.add', item),
        update: (id, item) => rpc('leadership.update', id, item),
        delete: (id) => rpc('leadership.delete', id),
        batchUpsert: (leadership) => rpc('leadership.batchUpsert', leadership),
        reorder: (leadershipIds) => rpc('leadership.reorder', leadershipIds)
    },

    messages: {
        getAll: () => rpc('messages.getAll'),
        add: (message) => rpc('messages.add', message),
        update: (id, message) => rpc('messages.update', id, message),
        delete: (id) => rpc('messages.delete', id)
    }
};

export const projectsService = dbService.projects;
export const skillsService = dbService.skills;
export const experiencesService = dbService.experiences;
export const certificationsService = dbService.certifications;
export const leadershipService = dbService.leadership;
export const messagesService = dbService.messages;
