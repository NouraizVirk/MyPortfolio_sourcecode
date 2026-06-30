import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Code2, Database, Cloud, Cpu, Layers, Terminal, Zap, GitBranch, Globe, Boxes, FileCode, Braces, ArrowUp, ArrowDown } from 'lucide-react';

const iconOptions = ['Code2', 'Database', 'Cloud', 'Cpu', 'Layers', 'Terminal', 'Zap', 'GitBranch', 'Globe', 'Boxes', 'FileCode', 'Braces'];

// Icon mapping
const iconMap = { Code2, Database, Cloud, Cpu, Layers, Terminal, Zap, GitBranch, Globe, Boxes, FileCode, Braces };

export default function SkillsManager({ skills, addSkill, deleteSkill, reorderSkills, saveSkillsOrder }) {
    const [formData, setFormData] = useState({ name: '', icon: 'Code2' });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasUnsavedOrder, setHasUnsavedOrder] = useState(false);
    const [isSavingOrder, setIsSavingOrder] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await addSkill(formData);
            setFormData({ name: '', icon: 'Code2' });
        } catch (err) {
            console.error('Error saving skill:', err);
            setError(err.message || 'Failed to save skill. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (skillName) => {
        setError(null);
        try {
            await deleteSkill(skillName);
        } catch (err) {
            console.error('Error deleting skill:', err);
            setError(err.message || 'Failed to delete skill. Please try again.');
        }
    };

    const handleMoveUp = (index) => {
        if (index > 0) {
            reorderSkills(index, index - 1, { persist: false });
            setHasUnsavedOrder(true);
        }
    };

    const handleMoveDown = (index) => {
        if (index < skills.length - 1) {
            reorderSkills(index, index + 1, { persist: false });
            setHasUnsavedOrder(true);
        }
    };

    const handleSaveOrder = async () => {
        setError(null);
        setIsSavingOrder(true);
        try {
            await saveSkillsOrder();
            setHasUnsavedOrder(false);
        } catch (err) {
            console.error('Error saving skills order:', err);
            setError(err.message || 'Failed to save skills order. Please try again.');
        } finally {
            setIsSavingOrder(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Skills Management</h2>
                <button
                    onClick={handleSaveOrder}
                    disabled={!hasUnsavedOrder || isSavingOrder || isLoading}
                    className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/15 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSavingOrder ? 'Saving order...' : 'Save Order'}
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-6"
            >
                <h3 className="text-xl font-semibold text-white mb-4">Add New Skill</h3>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex gap-4">
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Skill name (e.g., Python)"
                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                        required
                    />
                    <select
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary [&>option]:bg-black [&>option]:text-white"
                    >
                        {iconOptions.map(icon => (
                            <option key={icon} value={icon}>{icon}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus className="w-5 h-5" />
                        {isLoading ? 'Saving...' : 'Add'}
                    </button>
                </form>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {skills.map((skill, index) => {
                    const Icon = iconMap[skill.icon] || Code2;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass rounded-lg p-4 hover:bg-white/10 transition-all group relative"
                        >
                            <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleMoveUp(index)}
                                    disabled={index === 0}
                                    className="p-1 bg-white/5 hover:bg-white/10 rounded disabled:opacity-30"
                                    title="Move up"
                                >
                                    <ArrowUp className="w-3 h-3 text-white/70" />
                                </button>
                                <button
                                    onClick={() => handleMoveDown(index)}
                                    disabled={index === skills.length - 1}
                                    className="p-1 bg-white/5 hover:bg-white/10 rounded disabled:opacity-30"
                                    title="Move down"
                                >
                                    <ArrowDown className="w-3 h-3 text-white/70" />
                                </button>
                                <button
                                    onClick={() => handleDelete(skill.name)}
                                    className="p-1 bg-red-500/10 hover:bg-red-500/20 rounded"
                                >
                                    <Trash2 className="w-3 h-3 text-red-400" />
                                </button>
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <Icon className="w-8 h-8 text-primary" />
                                </div>
                                <p className="text-sm font-medium text-white">{skill.name}</p>
                                <p className="text-xs text-white/40 mt-1">{skill.icon}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
