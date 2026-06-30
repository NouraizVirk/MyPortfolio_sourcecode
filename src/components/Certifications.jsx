import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { usePortfolioData } from '../contexts/PortfolioDataContext';

function CertificationCard({ cert, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
        >
            <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-primary transition-colors">
                {cert.title}
            </h3>

            <div className="flex items-center gap-2 text-white/60 mb-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{cert.issuer}</span>
            </div>

            <div className="flex items-center gap-2 text-white/40 mb-4">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{cert.date}</span>
            </div>

            {cert.credentialUrl && (
                <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                </a>
            )}
        </motion.div>
    );
}

export default function Certifications() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { certifications, loading } = usePortfolioData();

    return (
        <section id="certifications" ref={ref} className="py-24 px-6 bg-black">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Certifications & Credentials
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl">
                        Industry-recognized certifications demonstrating expertise across AI/ML,
                        cloud platforms, and modern development practices.
                    </p>
                </motion.div>

                {certifications.length === 0 && loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((cert, index) => (
                            <CertificationCard key={cert.id} cert={cert} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
