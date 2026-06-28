import { useState } from 'react';
import api from '../api/axios';
import { User, Save, Loader2 } from 'lucide-react';

function getProfileFormData(profile) {
    const fullName = profile?.name ||
        [profile?.firstName, profile?.lastName].filter(Boolean).join(' ');

    return {
        name: fullName || '',
        email: profile?.email || '',
        position: profile?.position || '',
        bio: profile?.bio || '',
    };
}

const ProfileForm = ({ initialData, onSuccess }) => {
    const [formData, setFormData] = useState(() => getProfileFormData(initialData));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            await api.put('/users/me', {
                name: formData.name,
                bio: formData.bio,
            });
            setMessage('Profile updated successfully');
            onSuccess?.();
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <User className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-800">Public Profile</h2>
            </div>

            {error && (
                <div className="px-6 pt-6">
                    <div className="p-4 bg-rose-50 text-rose-600 rounded-lg border border-rose-100 text-sm">
                        {error}
                    </div>
                </div>
            )}

            {message && (
                <div className="px-6 pt-6">
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 text-sm">
                        {message}
                    </div>
                </div>
            )}

            <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            disabled={initialData?.isDeleted}
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                                initialData?.isDeleted ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : ''
                            }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            disabled
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
                        <input
                            type="text"
                            name="position"
                            disabled
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                    <textarea
                        name="bio"
                        disabled={initialData?.isDeleted}
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Write a brief bio..."
                        rows="4"
                        className={`w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none ${
                            initialData?.isDeleted ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : ''
                        }`}
                    ></textarea>
                    <p className="mt-2 text-xs text-slate-500">This will be displayed on your profile.</p>
                </div>
            </div>

            {initialData?.isDeleted ? (
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-rose-600">
                        <p className="text-sm font-medium">Account Deactivated</p>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">You can no longer update your profile.</p>
                </div>
            ) : (
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            )}
        </form>
    );
};

export default ProfileForm;
