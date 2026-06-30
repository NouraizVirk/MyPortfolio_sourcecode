import { motion } from 'framer-motion';
import { Mail, Trash2, Check, Clock } from 'lucide-react';

export default function MessagesManager({ messages, markMessageAsRead, deleteMessage }) {
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const unreadCount = messages.filter(m => !m.read).length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Messages & Queries</h2>
                    <p className="text-sm text-white/60 mt-1">
                        {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
                    </p>
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="glass rounded-xl p-12 text-center">
                    <Mail className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60">No messages yet</p>
                    <p className="text-sm text-white/40 mt-2">Messages from the contact form will appear here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`glass rounded-xl p-6 hover:bg-white/10 transition-all ${!message.read ? 'border-l-4 border-primary' : ''
                                }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-white">{message.name}</h3>
                                        {!message.read && (
                                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <a
                                        href={`mailto:${message.email}`}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        {message.email}
                                    </a>
                                    <div className="flex items-center gap-2 text-xs text-white/40 mt-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{formatDate(message.timestamp)}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {!message.read && (
                                        <button
                                            onClick={() => markMessageAsRead(message.id)}
                                            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                            title="Mark as read"
                                        >
                                            <Check className="w-4 h-4 text-green-400" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteMessage(message.id)}
                                        className="p-2 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Delete message"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                                <p className="text-white/80 whitespace-pre-wrap">{message.message}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
