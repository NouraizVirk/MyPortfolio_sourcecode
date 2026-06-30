import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, Heart, Megaphone } from 'lucide-react';
import { usePortfolioData } from '../contexts/PortfolioDataContext';

// Icon mapping
const iconMap = { Award, Users, Heart, Megaphone };

function LeadershipCard({ item, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const Icon = iconMap[item.icon] || Award;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
        >
            <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                            {item.title}
                        </h3>
                        <span className="text-xs text-white/40 font-mono">{item.year}</span>
                    </div>
                    <p className="text-primary font-medium mb-3">{item.organization}</p>
                    <p className="text-white/60 text-sm leading-relaxed">
                        {item.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default function Leadership() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { leadership, loading } = usePortfolioData();

    return (
        <section id="leadership" ref={ref} className="py-24 px-6 bg-black">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Leadership & Volunteer Work
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl">
                        Community engagement, leadership roles, and volunteer initiatives
                        contributing to social impact and organizational success.
                    </p>
                </motion.div>

                {/* Leadership grid */}
                {leadership.length === 0 && loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {leadership.map((item, index) => (
                            <LeadershipCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
