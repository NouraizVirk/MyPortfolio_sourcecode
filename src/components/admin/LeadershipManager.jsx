import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, X, Code, Users, Award, Heart, ArrowUp, ArrowDown } from 'lucide-react';

const iconOptions = ['Award', 'Users', 'Heart', 'Code'];

export default function LeadershipManager({ leadership, addLeadership, updateLeadership, deleteLeadership, reorderLeadership, saveLeadershipOrder }) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        organization: '',
        icon: 'Award',
        description: '',
        year: new Date().getFullYear().toString()
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasUnsavedOrder, setHasUnsavedOrder] = useState(false);
    const [isSavingOrder, setIsSavingOrder] = useState(false);

    const resetForm = () => {
        setFormData({
            title: '',
            organization: '',
            icon: 'Award',
            description: '',
            year: new Date().getFullYear().toString()
        });
        setIsAdding(false);
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (editingId) {
                await updateLeadership(editingId, formData);
            } else {
                await addLeadership(formData);
            }
            resetForm();
        } catch (err) {
            console.error('Error saving leadership role:', err);
            setError(err.message || 'Failed to save leadership role. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (item) => {
        setFormData(item);
        setEditingId(item.id);
        setIsAdding(true);
    };

    const handleDelete = async (id) => {
        setError(null);
        try {
            await deleteLeadership(id);
        } catch (err) {
            console.error('Error deleting leadership role:', err);
            setError(err.message || 'Failed to delete leadership role. Please try again.');
        }
    };

    const handleMoveUp = (index) => {
        if (index > 0) {
            reorderLeadership(index, index - 1, { persist: false });
            setHasUnsavedOrder(true);
        }
    };

    const handleMoveDown = (index) => {
        if (index < leadership.length - 1) {
            reorderLeadership(index, index + 1, { persist: false });
            setHasUnsavedOrder(true);
        }
    };

    const handleSaveOrder = async () => {
        setError(null);
        setIsSavingOrder(true);
        try {
            await saveLeadershipOrder();
            setHasUnsavedOrder(false);
        } catch (err) {
            console.error('Error saving leadership order:', err);
            setError(err.message || 'Failed to save leadership order. Please try again.');
        } finally {
            setIsSavingOrder(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Leadership & Volunteer Work Management</h2>
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
                        <span>{isAdding ? 'Cancel' : 'Add Leadership Role'}</span>
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
                        {editingId ? 'Edit Leadership Role' : 'Add New Leadership Role'}
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
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Organization</label>
                                <input
                                    type="text"
                                    value={formData.organization}
                                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
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
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Icon</label>
                            <select
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                            >
                                {iconOptions.map(icon => (
                                    <option key={icon} value={icon}>{icon}</option>
                                ))}
                            </select>
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
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Saving...' : `${editingId ? 'Update' : 'Add'} Leadership Role`}
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
                {leadership.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass rounded-xl p-6 hover:bg-white/10 transition-all"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                                <p className="text-primary font-medium mb-1">{item.organization}</p>
                                <p className="text-xs text-white/40">{item.year} • Icon: {item.icon}</p>
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
                                    disabled={index === leadership.length - 1}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
                                    title="Move down"
                                >
                                    <ArrowDown className="w-4 h-4 text-white/70" />
                                </button>
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <Edit className="w-4 h-4 text-primary" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-white/60">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
