import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, onConfirm, duration = 3000 }) => {
    useEffect(() => {
        if (type === 'confirm') return; // Don't auto-close confirm toasts
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose, type]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 20, x: '-50%' }}
                className="fixed bottom-10 left-1/2 z-50 flex flex-col items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border border-white/10 min-w-[300px]"
                style={{
                    background: type === 'success' ? 'rgba(16, 185, 129, 0.95)' :
                        type === 'error' ? 'rgba(239, 68, 68, 0.95)' :
                            'rgba(30, 58, 138, 0.95)', // Blue for confirm
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                }}
            >
                <div className="flex items-center gap-3">
                    {type === 'success' && <CheckCircle className="w-5 h-5 text-white" />}
                    {type === 'error' && <XCircle className="w-5 h-5 text-white" />}
                    {type === 'confirm' && <div className="p-1 bg-white/20 rounded-full"><XCircle className="w-5 h-5 text-white" /></div>}
                    <span className="text-white font-bold text-sm">{message}</span>
                </div>

                {type === 'confirm' && (
                    <div className="flex gap-2 mt-2 w-full justify-center">
                        <button
                            onClick={onConfirm}
                            className="px-4 py-1.5 bg-white text-brand-blue font-bold text-xs rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            네, 취소합니다
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-1.5 bg-black/20 text-white font-bold text-xs rounded-lg hover:bg-black/40 transition-colors"
                        >
                            아니오
                        </button>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default Toast;
