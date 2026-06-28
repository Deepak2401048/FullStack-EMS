import { useState } from 'react';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

const CheckInButton = ({ todayRecord, onAction }) => {
    const [loading, setLoading] = useState(false);

    const handleAttendance = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onAction();
        }, 1000);
    };

    if (todayRecord?.checkout) {
        return (
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                <h3 className="text-lg font-medium text-slate-900 mb-1">Workday Completed</h3>
                <p className="text-slate-500">Great job! See you tomorrow.</p>
            </div>
        );
    }

    const isCheckedIn = !!todayRecord?.checkIn;

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">
                    {loading ? 'Processing...' : isCheckedIn ? 'Clock Out' : 'Clock In'}
                </h2>
                <p className="text-slate-500">
                    {isCheckedIn ? 'Click to end your shift' : 'Start your workday'}
                </p>
            </div>
            <button
                onClick={handleAttendance}
                disabled={loading}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium text-white transition-all ${
                    isCheckedIn
                        ? 'bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950'
                        : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800'
                }`}
            >
                {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : isCheckedIn ? (
                    <LogOut className="w-5 h-5" />
                ) : (
                    <LogIn className="w-5 h-5" />
                )}
                {isCheckedIn ? 'Clock Out' : 'Clock In'}
            </button>
        </div>
    );
};

export default CheckInButton;