import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Images } from 'lucide-react';
import { usePortfolioData } from '../contexts/PortfolioDataContext';
import ImageGallery from './ImageGallery';

function ProjectCard({ project, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const hasImages = project.images && project.images.length > 0;

    return (
        <>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                            <span className="text-xs text-white/40 font-mono">{project.year}</span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed mb-4">
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-md bg-white/5 text-white/70 border border-white/10"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-white/10">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-white/60 hover:text-primary transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            <span>Source Code</span>
                        </a>
                    )}
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-white/60 hover:text-primary transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                        </a>
                    )}
                    {hasImages && (
                        <button
                            onClick={() => setIsGalleryOpen(true)}
                            className="flex items-center gap-2 text-sm text-white/60 hover:text-primary transition-colors"
                        >
                            <Images className="w-4 h-4" />
                            <span>View Images ({project.images.length})</span>
                        </button>
                    )}
                </div>
            </motion.div>

            {/* Image Gallery Modal */}
            {hasImages && (
                <ImageGallery
                    images={project.images}
                    isOpen={isGalleryOpen}
                    onClose={() => setIsGalleryOpen(false)}
                    projectTitle={project.title}
                />
            )}
        </>
    );
}

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { projects, loading } = usePortfolioData();

    return (
        <section id="work" ref={ref} className="py-24 px-6 bg-black">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Technical Projects
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl">
                        A selection of projects demonstrating expertise in AI/ML, DevOps,
                        full-stack development, and computer vision.
                    </p>
                </motion.div>

                {/* Projects grid */}
                {projects.length === 0 && loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
