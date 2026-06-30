import { motion } from 'framer-motion';
import { Mail, Phone, Send, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { usePortfolioData } from '../contexts/PortfolioDataContext';

export default function Contact() {
    const { addMessage } = usePortfolioData();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        addMessage(formData);
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section id="contact" className="py-24 px-6 bg-black">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Get In Touch
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="glass rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-6 text-white">Contact Information</h3>

                            <div className="space-y-4">
                                <a
                                    href="mailto:your.email@example.com"
                                    className="flex items-center gap-4 text-white/70 hover:text-primary transition-colors group"
                                >
                                    <div className="p-3 bg-white/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/50">Email</p>
                                        <p className="font-medium">your.email@example.com</p>
                                    </div>
                                </a>

                                <a
                                    href="tel:+1234567890"
                                    className="flex items-center gap-4 text-white/70 hover:text-primary transition-colors group"
                                >
                                    <div className="p-3 bg-white/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/50">Phone</p>
                                        <p className="font-medium">+1 234 567 890</p>
                                    </div>
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 text-white/70 hover:text-primary transition-colors group"
                                >
                                    <div className="p-3 bg-white/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/50">LinkedIn</p>
                                        <p className="font-medium">yourusername</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="glass rounded-xl p-6"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-xl font-semibold mb-6 text-white">Send a Message</h3>

                        {submitted && (
                            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                                ✓ Message sent successfully!
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <textarea
                                    rows="4"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                            >
                                <span>Send Message</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                    className="mt-16 pt-8 border-t border-white/10 text-center text-white/50"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <p>© 2025 [Your Name]. All rights reserved.</p>
                </motion.div>
            </div>
        </section>
    );
}
