import { useState, useCallback, useEffect } from 'react';
import Loading from '../components/Loading';
import LeaveHistory from '../components/leave/LeaveHistory';
import ApplyLeaveModal from '../components/leave/ApplyLeaveModal';
import { dummyLeaveData } from '../assets/assets';
import { Plus, Thermometer, Calendar, Clock } from 'lucide-react';

const Leave = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Change to true to test admin view

    const fetchLeaves = useCallback(async () => {
        setLeaves(dummyLeaveData);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        fetchLeaves();
    }, [fetchLeaves]);

    if (loading) {
        return <Loading />;
    }

    const approvedLeaves = leaves.filter((l) => l.status === 'Approved');
    const sickCount = approvedLeaves.filter((l) => l.type === 'Sick').length;
    const casualCount = approvedLeaves.filter((l) => l.type === 'Casual').length;
    const annualCount = approvedLeaves.filter((l) => l.type === 'Annual').length;

    const leaveStats = [
        { label: 'Sick Leave', value: `${sickCount} Taken`, icon: Thermometer },
        { label: 'Casual Leave', value: `${casualCount} Taken`, icon: Calendar },
        { label: 'Annual Leave', value: `${annualCount} Taken`, icon: Clock },
    ];

    return (
        <div className="animate-fade-in px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="page-title">Leave Management</h1>
                    <p className="page-subtitle">
                        {isAdmin ? 'Manage leave applications' : 'Your leave history and requests'}
                    </p>
                </div>
                {!isAdmin && !isDeleted && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Apply for Leave
                    </button>
                )}
            </div>

            {!isAdmin && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {leaveStats.map((s) => (
                        <div key={s.label} className="card p-6 flex items-center gap-4 bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                                <s.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">{s.label}</p>
                                <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <LeaveHistory 
                leaves={leaves} 
                isAdmin={isAdmin} 
                onUpdate={fetchLeaves} 
            />

            <ApplyLeaveModal 
                open={showModal} 
                onClose={() => setShowModal(false)} 
                onSuccess={fetchLeaves} 
            />
        </div>
    );
};

export default Leave;