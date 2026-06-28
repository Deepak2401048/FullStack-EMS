import { useState } from 'react';
import api from '../api/axios';
import { X, Lock, Loader2 } from 'lucide-react';

const ChangePasswordModal = ({ open, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData(e.currentTarget);
        const currentPassword = formData.get('currentPassword');
        const newPassword = formData.get('newPassword');

        try {
            const response = await api.post('/change-password', {
                currentPassword,
                newPassword,
            });

            if (!response.data.success) {
                throw new Error(response.data.error || 'Failed to update password');
            }

            e.target.reset();
            setMessage({ type: 'success', text: 'Password updated successfully' });
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.error || error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-indigo-600" />
                        <h2 className="text-xl font-bold text-slate-800">Change Password</h2>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {message.text && (
                        <div className={`p-4 rounded-lg border text-sm ${
                            message.type === 'success' 
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                : 'bg-rose-50 text-rose-600 border-rose-100'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            required
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            required
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="btn-secondary flex-1">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;