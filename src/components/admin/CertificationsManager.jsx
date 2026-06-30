import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, X, ArrowUp, ArrowDown } from 'lucide-react';

export default function CertificationsManager({ certifications, addCertification, updateCertification, deleteCertification, reorderCertifications, saveCertificationsOrder }) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        date: new Date().getFullYear().toString(),
        credentialUrl: ''
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasUnsavedOrder, setHasUnsavedOrder] = useState(false);
    const [isSavingOrder, setIsSavingOrder] = useState(false);

    const resetForm = () => {
        setFormData({
            title: '',
            issuer: '',
            date: new Date().getFullYear().toString(),
            credentialUrl: ''
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
            if (editingId) {
                await updateCertification(editingId, formData);
            } else {
                await addCertification(formData);
            }
            resetForm();
        } catch (err) {
            console.error('Error saving certification:', err);
            setError(err.message || 'Failed to save certification. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (cert) => {
        setFormData(cert);
        setEditingId(cert.id);
        setIsAdding(true);
    };

    const handleDelete = (id) => {
        deleteCertification(id);
    };

    const handleMoveUp = (index) => {
        if (index > 0) {
            reorderCertifications(index, index - 1, { persist: false });
            setHasUnsavedOrder(true);
        }
    };

    const handleMoveDown = (index) => {
        if (index < certifications.length - 1) {
            reorderCertifications(index, index + 1, { persist: false });
            setHasUnsavedOrder(true);
        }
    };

    const handleSaveOrder = async () => {
        setError(null);
        setIsSavingOrder(true);
        try {
            await saveCertificationsOrder();
            setHasUnsavedOrder(false);
        } catch (err) {
            console.error('Error saving certifications order:', err);
            setError(err.message || 'Failed to save certifications order. Please try again.');
        } finally {
            setIsSavingOrder(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Certifications Management</h2>
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
                        <span>{isAdding ? 'Cancel' : 'Add Certification'}</span>
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
                        {editingId ? 'Edit Certification' : 'Add New Certification'}
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
                                <label className="block text-sm font-medium text-white/80 mb-2">Issuer</label>
                                <input
                                    type="text"
                                    value={formData.issuer}
                                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Date</label>
                                <input
                                    type="text"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Credential URL</label>
                            <input
                                type="text"
                                value={formData.credentialUrl}
                                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                            />
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
                                    <span>{editingId ? 'Update' : 'Add'} Certification</span>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass rounded-xl p-6 hover:bg-white/10 transition-all"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-white flex-1">{cert.title}</h3>
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
                                    disabled={index === certifications.length - 1}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
                                    title="Move down"
                                >
                                    <ArrowDown className="w-4 h-4 text-white/70" />
                                </button>
                                <button
                                    onClick={() => handleEdit(cert)}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <Edit className="w-4 h-4 text-primary" />
                                </button>
                                <button
                                    onClick={() => handleDelete(cert.id)}
                                    className="p-2 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                </button>
                            </div>
                        </div>
                        <p className="text-primary font-medium mb-2">{cert.issuer}</p>
                        <p className="text-sm text-white/40">{cert.date}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
