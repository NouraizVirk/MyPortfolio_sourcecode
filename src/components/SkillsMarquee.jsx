import { motion } from 'framer-motion';
import {
    Code2, Database, Cloud, Cpu, Layers, Terminal,
    Zap, GitBranch, Globe, Boxes, FileCode, Braces
} from 'lucide-react';
import { usePortfolioData } from '../contexts/PortfolioDataContext';

// Icon mapping
const iconMap = { Code2, Database, Cloud, Cpu, Layers, Terminal, Zap, GitBranch, Globe, Boxes, FileCode, Braces };

export default function SkillsMarquee() {
    const { skills } = usePortfolioData();
    const duplicatedSkills = [...skills, ...skills];

    return (
        <section className="py-20 overflow-hidden bg-black">
            <div className="mb-12 text-center px-6">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-4 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Technical Skills
                </motion.h2>
                <motion.p
                    className="text-lg text-white/60 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Comprehensive technology stack spanning AI/ML, DevOps, Cloud, and Full-Stack Development
                </motion.p>
            </div>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

                <motion.div
                    className="flex gap-6"
                    animate={{
                        x: [0, -50 + '%'],
                    }}
                    transition={{
                        x: {
                            duration: 50,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                    }}
                >
                    {duplicatedSkills.map((skill, index) => {
                        const Icon = iconMap[skill.icon] || Code2;
                        return (
                            <div
                                key={`${skill.name}-${index}`}
                                className="flex items-center gap-3 px-6 py-4 glass rounded-lg whitespace-nowrap"
                            >
                                <Icon className="w-5 h-5 text-primary" />
                                <span className="text-base font-medium text-white">{skill.name}</span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
