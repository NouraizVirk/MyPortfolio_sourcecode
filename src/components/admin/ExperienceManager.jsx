import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, X, ArrowUp, ArrowDown } from 'lucide-react';

export default function ExperienceManager({ experiences, addExperience, updateExperience, deleteExperience, reorderExperiences, saveExperiencesOrder }) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        period: '',
        description: '',
        achievements: ''
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasUnsavedOrder, setHasUnsavedOrder] = useState(false);
    const [isSavingOrder, setIsSavingOrder] = useState(false);

    const resetForm = () => {
        setFormData({
            title: '',
            company: '',
            location: '',
            period: '',
            description: '',
            achievements: ''
        });
        setIsAdding(false);
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const expData = {
            ...formData,
            achievements: formData.achievements.split('\n').filter(Boolean)
        };

        try {
            if (editingId) {
                await updateExperience(editingId, expData);
            } else {
                await addExperience(expData);
            }
            resetForm();
        } catch (err) {
            console.error('Error saving experience:', err);
            setError(err.message || 'Failed to save experience. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (exp) => {
        setFormData({
            ...exp,
            achievements: exp.achievements.join('\n')
        });
        setEditingId(exp.id);
        setIsAdding(true);
    };

    const handleDelete = async (id) => {
        setError(null);
        try {
            await deleteExperience(id);
        } catch (err) {
            console.error('Error deleting experience:', err);
            setError(err.message || 'Failed to delete experience. Please try again.');
        }
    };

    const handleMoveUp = (index) => {
        if (index > 0) {
            reorderExperiences(index, index - 1, { persist: false });
            setHasUnsavedOrder(true);
        }
    };

    const handleMoveDown = (index) => {
        if (index < experiences.length - 1) {
            reorderExperiences(index, index + 1, { persist: false });
            setHasUnsavedOrder(true);
        }
    };

    const handleSaveOrder = async () => {
        setError(null);
        setIsSavingOrder(true);
        try {
            await saveExperiencesOrder();
            setHasUnsavedOrder(false);
        } catch (err) {
            console.error('Error saving experiences order:', err);
            setError(err.message || 'Failed to save experience order. Please try again.');
        } finally {
            setIsSavingOrder(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Experience Management</h2>
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
                        <span>{isAdding ? 'Cancel' : 'Add Experience'}</span>
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
                        {editingId ? 'Edit Experience' : 'Add New Experience'}
                    </h3>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
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
                                <label className="block text-sm font-medium text-white/80 mb-2">Company</label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Period</label>
                                <input
                                    type="text"
                                    value={formData.period}
                                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                                    placeholder="e.g., Jan 2024 - Present"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary resize-none"
                                rows="2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Achievements (one per line)</label>
                            <textarea
                                value={formData.achievements}
                                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary resize-none"
                                rows="4"
                                placeholder="Achievement 1&#10;Achievement 2&#10;Achievement 3"
                                required
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Saving...' : `${editingId ? 'Update' : 'Add'} Experience`}
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

            <div className="space-y-4">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass rounded-xl p-6 hover:bg-white/10 transition-all"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                                <p className="text-primary font-medium">{exp.company}</p>
                                <p className="text-sm text-white/50">{exp.location} • {exp.period}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleMoveUp(index)}
                                    disabled={index === 0}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
                                    title="Move up"
                                >
                                    <ArrowUp className="w-4 h-4 text-white/70" />
                                </button>
                                <button
                                    onClick={() => handleMoveDown(index)}
                                    disabled={index === experiences.length - 1}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
                                    title="Move down"
                                >
                                    <ArrowDown className="w-4 h-4 text-white/70" />
                                </button>
                                <button
                                    onClick={() => handleEdit(exp)}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <Edit className="w-4 h-4 text-primary" />
                                </button>
                                <button
                                    onClick={() => handleDelete(exp.id)}
                                    className="p-2 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-white/70 mb-3">{exp.description}</p>
                        <ul className="space-y-1">
                            {exp.achievements.map((achievement, i) => (
                                <li key={i} className="text-sm text-white/60 flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
