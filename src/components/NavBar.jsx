import { motion } from 'framer-motion';
import { useState } from 'react';
import { Home, Briefcase, Award, Mail, User } from 'lucide-react';

const navItems = [
    { name: 'Home', url: '#home', icon: Home },
    { name: 'About', url: '#about', icon: User },
    { name: 'Work', url: '#work', icon: Briefcase },
    { name: 'Certifications', url: '#certifications', icon: Award },
    { name: 'Contact', url: '#contact', icon: Mail },
];

export default function NavBar() {
    const [activeTab, setActiveTab] = useState('Home');

    const handleClick = (name, url) => {
        setActiveTab(name);
        const element = document.querySelector(url);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6">
            <div className="flex items-center gap-3 bg-black/50 border border-white backdrop-blur-xl py-1 px-1 rounded-full shadow-lg">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.name;

                    return (
                        <button
                            key={item.name}
                            onClick={() => handleClick(item.name, item.url)}
                            className={`relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors ${isActive
                                    ? 'bg-muted text-primary'
                                    : 'text-white/80 hover:text-primary'
                                }`}
                        >
                            <span className="hidden md:inline">{item.name}</span>
                            <span className="md:hidden">
                                <Icon size={18} strokeWidth={2.5} />
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                                    initial={false}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                                        <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                                        <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                                        <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                                    </div>
                                </motion.div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
