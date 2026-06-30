import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, FolderKanban, Code, Briefcase, Award, Users, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePortfolioData } from '../contexts/PortfolioDataContext';
import ProjectsManager from '../components/admin/ProjectsManager';
import SkillsManager from '../components/admin/SkillsManager';
import ExperienceManager from '../components/admin/ExperienceManager';
import CertificationsManager from '../components/admin/CertificationsManager';
import LeadershipManager from '../components/admin/LeadershipManager';
import MessagesManager from '../components/admin/MessagesManager';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('projects');
    const { logout } = useAuth();
    const navigate = useNavigate();
    const portfolioData = usePortfolioData();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const unreadMessages = portfolioData.messages.filter(m => !m.read).length;

    if (portfolioData.loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-2 border-white/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/70">Loading admin data...</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'projects', label: 'Projects', icon: FolderKanban, count: portfolioData.projects.length },
        { id: 'skills', label: 'Skills', icon: Code, count: portfolioData.skills.length },
        { id: 'experience', label: 'Experience', icon: Briefcase, count: portfolioData.experiences.length },
        { id: 'certifications', label: 'Certifications', icon: Award, count: portfolioData.certifications.length },
        { id: 'leadership', label: 'Leadership', icon: Users, count: portfolioData.leadership.length },
        { id: 'messages', label: 'Messages', icon: MessageSquare, count: portfolioData.messages.length, badge: unreadMessages },
    ];

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                            <p className="text-sm text-white/60">Manage your portfolio content</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Database Status Indicator */}
                            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${portfolioData.useDatabase
                                    ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>
                                <div className={`w-2 h-2 rounded-full ${portfolioData.useDatabase ? 'bg-green-500 animate-pulse' : 'bg-red-400'
                                    }`} />
                                {portfolioData.useDatabase ? 'Neon DB Connected' : 'Database Not Configured'}
                            </div>

                            <a
                                href="/"
                                className="px-4 py-2 text-white/70 hover:text-white transition-colors"
                            >
                                View Portfolio
                            </a>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-white/10 bg-black/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-2 overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-4 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-white/60 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{tab.label}</span>
                                    <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs">
                                        {tab.count}
                                    </span>
                                    {tab.badge > 0 && (
                                        <span className="px-2 py-0.5 bg-primary rounded-full text-xs text-white font-semibold">
                                            {tab.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'projects' && <ProjectsManager {...portfolioData} />}
                    {activeTab === 'skills' && <SkillsManager {...portfolioData} />}
                    {activeTab === 'experience' && <ExperienceManager {...portfolioData} />}
                    {activeTab === 'certifications' && <CertificationsManager {...portfolioData} />}
                    {activeTab === 'leadership' && <LeadershipManager {...portfolioData} />}
                    {activeTab === 'messages' && <MessagesManager {...portfolioData} />}
                </motion.div>
            </div>
        </div>
    );
}
