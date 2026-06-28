import { Calendar, AlertCircle, Clock } from 'lucide-react';

const AttendanceStats = ({ history }) => {
    const totalPresent = history.filter(
        (h) => h.status === 'Present' || h.status === 'Late'
    ).length;

    const totalLate = history.filter((h) => h.status === 'Late').length;

    const stats = [
        {
            label: 'Days Present',
            value: totalPresent,
            icon: Calendar,
        },
        {
            label: 'Late Arrivals',
            value: totalLate,
            icon: AlertCircle,
        },
        {
            label: 'Average Work Hours',
            value: '8.5 hrs',
            icon: Clock,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {stats.map((s) => (
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
    );
};

export default AttendanceStats;