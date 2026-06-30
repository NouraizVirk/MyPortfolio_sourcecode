import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle({ theme, toggleTheme }) {
    return (
        <motion.button
            onClick={toggleTheme}
            className="fixed top-8 right-8 z-50 p-4 rounded-full glass hover:glass-light transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                {theme === 'dark' ? (
                    <Sun className="w-6 h-6 text-accent-tertiary" />
                ) : (
                    <Moon className="w-6 h-6 text-accent-primary" />
                )}
            </motion.div>
        </motion.button>
    );
}
