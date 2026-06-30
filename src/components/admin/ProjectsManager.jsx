import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, X, ArrowUp, ArrowDown, ImagePlus } from 'lucide-react';

export default function ProjectsManager({ projects, addProject, updateProject, deleteProject, reorderProjects, saveProjectsOrder }) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tech: '',
        github: '',
        demo: '',
        year: new Date().getFullYear().toString(),
        images: []
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasUnsavedOrder, setHasUnsavedOrder] = useState(false);
    const [isSavingOrder, setIsSavingOrder] = useState(false);

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            tech: '',
            github: '',
            demo: '',
            year: new Date().getFullYear().toString(),
            images: []
        });
        setIsAdding(false);
        setEditingId(null);
        setError(null);
        setIsLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const projectData = {
                ...formData,
                tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean),
                images: formData.images || []
            };

            if (editingId) {
                await updateProject(editingId, projectData);
            } else {
                await addProject(projectData);
            }
            resetForm();
        } catch (err) {
            console.error('Error saving project:', err);
            setError(err.message || 'Failed to save project. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (project) => {
        setFormData({
            ...project,
            tech: project.tech.join(', '),
            images: project.images || []
        });
        setEditingId(project.id);
        setIsAdding(true);
    };

    const handleDelete = (id) => {
        deleteProject(id);
    };

    const handleMoveUp = (index) => {
        if (index > 0) {
            reorderProjects(index, index - 1, { persist: false });
            setHasUnsavedOrder(true);
        }
    };

    const handleMoveDown = (index) => {
        if (index < projects.length - 1) {
            reorderProjects(index, index + 1, { persist: false });
            setHasUnsavedOrder(true);
        }
    };

    const handleSaveOrder = async () => {
        setError(null);
        setIsSavingOrder(true);
        try {
            await saveProjectsOrder();
            setHasUnsavedOrder(false);
        } catch (err) {
            console.error('Error saving project order:', err);
            setError(err.message || 'Failed to save project order. Please try again.');
        } finally {
            setIsSavingOrder(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Projects Management</h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSaveOrder}
                        disabled={!hasUnsavedOrder || isSavingOrder || isLoading}
                        className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/15 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSavingOrder ? 'Saving order...' : 'Save Order'}
                    </button>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                        {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        <span>{isAdding ? 'Cancel' : 'Add Project'}</span>
                    </button>
                </div>
            </div>

            {isAdding && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-xl p-6"
                >
                    <h3 className="text-xl font-semibold text-white mb-4">
                        {editingId ? 'Edit Project' : 'Add New Project'}
                    </h3>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary resize-none"
                                rows="3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Technologies (comma-separated)</label>
                                <input
                                    type="text"
                                    value={formData.tech}
                                    onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                                    placeholder="React, Node.js, MongoDB"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Year</label>
                                <input
                                    type="text"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">GitHub URL</label>
                                <input
                                    type="text"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Demo URL</label>
                                <input
                                    type="text"
                                    value={formData.demo}
                                    onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Project Images</label>
                            <div className="space-y-3">
                                {/* Image previews */}
                                {formData.images.length > 0 && (
                                    <div className="grid grid-cols-3 gap-3">
                                        {formData.images.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={image}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded-lg border border-white/10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newImages = formData.images.filter((_, i) => i !== index);
                                                        setFormData({ ...formData, images: newImages });
                                                    }}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* File upload button */}
                                <label className="w-full px-4 py-3 bg-white/5 border border-white/10 border-dashed rounded-lg text-white/60 hover:text-white hover:border-primary transition-colors flex items-center justify-center gap-2 cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={async (e) => {
                                            const files = Array.from(e.target.files);
                                            if (files.length === 0) return;

                                            // Show loading state
                                            const loadingToast = document.createElement('div');
                                            loadingToast.className = 'fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50';
                                            loadingToast.textContent = `Uploading ${files.length} image(s)...`;
                                            document.body.appendChild(loadingToast);

                                            try {
                                                // Import the upload utility
                                                const { compressAndUploadImage } = await import('../../utils/imageUpload.js');

                                                // Upload all files
                                                const uploadedImages = await Promise.all(
                                                    files.map(file => compressAndUploadImage(file))
                                                );

                                                // Add to form data
                                                setFormData({
                                                    ...formData,
                                                    images: [...formData.images, ...uploadedImages]
                                                });

                                                loadingToast.textContent = '✅ Images uploaded!';
                                                setTimeout(() => loadingToast.remove(), 2000);
                                            } catch (error) {
                                                console.error('Upload error:', error);
                                                loadingToast.textContent = '❌ Upload failed: ' + error.message;
                                                loadingToast.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
                                                setTimeout(() => loadingToast.remove(), 3000);
                                            }

                                            // Reset input
                                            e.target.value = '';
                                        }}
                                        className="hidden"
                                    />
                                    <ImagePlus className="w-4 h-4" />
                                    <span>Upload Images from Computer</span>
                                </label>
                                <p className="text-xs text-white/40">
                                    Click to select images from your computer. Max 5MB per image. Images will be compressed automatically.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <span>{editingId ? 'Update' : 'Add'} Project</span>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                disabled={isLoading}
                                className="px-6 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass rounded-xl p-6 hover:bg-white/10 transition-all"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
                                <span className="text-xs text-white/40">{project.year}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleMoveUp(index)}
                                    disabled={index === 0}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Move up"
                                >
                                    <ArrowUp className="w-4 h-4 text-white/70" />
                                </button>
                                <button
                                    onClick={() => handleMoveDown(index)}
                                    disabled={index === projects.length - 1}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Move down"
                                >
                                    <ArrowDown className="w-4 h-4 text-white/70" />
                                </button>
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <Edit className="w-4 h-4 text-primary" />
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="p-2 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-white/60 mb-3 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, i) => (
                                <span key={i} className="px-2 py-1 bg-white/5 text-xs text-white/70 rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
