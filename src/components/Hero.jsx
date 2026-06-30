import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [iframeLoaded, setIframeLoaded] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        // Delay the 3D model load to prioritize smooth initial page animations
        const timer = setTimeout(() => {
            setIframeLoaded(true);
        }, 1500);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timer);
        };
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
            {/* Pure black background */}
            <div className="absolute inset-0 bg-black" />

            {/* Cursor light effect - covers whole page */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-30 transition duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.35), transparent 28%)`,
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left side - Text content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
                        >
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-white/80">Available for new opportunities</span>
                        </motion.div>

                        {/* Main heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
                                [Your Name]
                            </h1>
                        </motion.div>

                        {/* Description */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-2xl md:text-3xl font-semibold text-white/90"
                        >
                            [Your Degree / Subtitle]
                            <br />
                            <span className="text-primary">[Your Main Specialization]</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-lg text-white/60 leading-relaxed max-w-xl"
                        >
                            [A brief description about yourself, your skills, and what you do. This is a placeholder description that you should replace with your own personal summary.]
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a
                                href="#work"
                                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-primary/20"
                            >
                                <span>View My Work</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a
                                href="mailto:your.email@example.com"
                                className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                <span>Get In Touch</span>
                            </a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex gap-4 pt-4"
                        >
                            {[
                                { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
                                { icon: Linkedin, href: 'https://www.linkedin.com/in/yourusername', label: 'LinkedIn' },
                                { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
                            ].map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:scale-110 transition-all duration-200"
                                >
                                    <Icon className="w-5 h-5 text-white/80" />
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right side - 3D Robot with iframe */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative hidden md:block h-[700px]"
                    >
                        <div className="relative w-full h-full">
                            {iframeLoaded ? (
                                <motion.iframe
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    src='https://my.spline.design/nexbotrobotcharacterconcept-W8PiQCWw9oAL5vEO7qlyLIIY/'
                                    frameBorder='0'
                                    width='100%'
                                    height='100%'
                                    className="w-full h-full"
                                    style={{
                                        background: 'transparent',
                                    }}
                                    title="3D Robot"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                            {/* Overlay to hide Spline logo */}
                            <div className="absolute bottom-0 right-0 w-48 h-20 bg-black pointer-events-none z-20" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 0.8, duration: 0.3 },
                    y: { duration: 2, repeat: Infinity }
                }}
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
                    <motion.div
                        className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
