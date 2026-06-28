import { useState, useCallback, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import ProfileForm from '../components/ProfileForm';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { Lock } from 'lucide-react';

const Settings = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const fetchProfile = useCallback(async () => {
        try {
            const response = await api.get('/users/me');
            if (response.data) {
                setProfile(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProfile();
    }, [fetchProfile]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="page-title">Settings</h1>
                <p className="page-subtitle">Manage your account and preferences</p>
            </div>

            {profile && (
                <ProfileForm initialData={profile} onSuccess={fetchProfile} />
            )}

            <div className="mt-6 card p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-50 text-slate-600 rounded-lg">
                        <Lock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-medium text-slate-800">Password</p>
                        <p className="text-sm text-slate-500">Update your account password</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowPasswordModal(true)}
                    className="btn-secondary text-sm"
                >
                    Change
                </button>
            </div>

            <ChangePasswordModal
                open={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />
        </div>
    );
};

export default Settings;
