import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { usePortfolioData } from '../contexts/PortfolioDataContext';

function ExperienceCard({ experience, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 pb-12 last:pb-0"
        >
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10">
                <motion.div
                    className="absolute top-0 left-0 w-px bg-primary"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: '100%' } : {}}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                />
            </div>

            {/* Timeline dot */}
            <motion.div
                className="absolute left-0 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-black"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
            />

            <div className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                            {experience.title}
                        </h3>
                        <div className="flex items-center gap-2 text-primary font-medium mb-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{experience.company}</span>
                        </div>
                        <p className="text-sm text-white/50">{experience.location}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{experience.period}</span>
                </div>

                <p className="text-white/70 mb-4">{experience.description}</p>

                <ul className="space-y-2">
                    {experience.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                            <span className="text-primary mt-1">•</span>
                            <span>{achievement}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

export default function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { experiences, loading } = usePortfolioData();

    return (
        <section id="about" ref={ref} className="py-24 px-6 bg-black">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Professional Experience
                    </h2>
                    <p className="text-lg text-white/60">
                        My journey in AI/ML and software engineering
                    </p>
                </motion.div>

                <div className="relative">
                    {experiences.length === 0 && loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        experiences.map((experience, index) => (
                            <ExperienceCard key={experience.id} experience={experience} index={index} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
