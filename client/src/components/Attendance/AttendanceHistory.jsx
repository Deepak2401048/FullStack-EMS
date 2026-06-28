import { format } from 'date-fns';
import { getDayTypeDisplay, getWorkingHoursDisplay } from '../../assets/assets';

const AttendanceHistory = ({ history }) => {
    return (
        <div className="card overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
            </div>
            <div className="scrollbar-thin overflow-x-auto overflow-y-auto max-h-[60vh]">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="py-3 px-6 text-sm font-medium text-slate-600">Date</th>
                            <th className="py-3 px-6 text-sm font-medium text-slate-600">Check In</th>
                            <th className="py-3 px-6 text-sm font-medium text-slate-600">Check Out</th>
                            <th className="py-3 px-6 text-sm font-medium text-slate-600">Working Hours</th>
                            <th className="py-3 px-6 text-sm font-medium text-slate-600">Day Type</th>
                            <th className="py-3 px-6 text-sm font-medium text-slate-600">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {history.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-12 text-center text-slate-400">
                                    No records found
                                </td>
                            </tr>
                        ) : (
                            history.map((record) => {
                                const dayType = getDayTypeDisplay(record);
                                return (
                                    <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <span className="font-medium text-slate-900">
                                                {format(new Date(record.date), 'MMM dd, yyyy')}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-slate-600">
                                            {record.checkIn
                                                ? format(new Date(record.checkIn), 'hh:mm a')
                                                : '-'}
                                        </td>
                                        <td className="py-4 px-6 text-slate-600">
                                            {record.checkout
                                                ? format(new Date(record.checkout), 'hh:mm a')
                                                : '-'}
                                        </td>
                                        <td className="py-4 px-6 text-slate-600">
                                            {getWorkingHoursDisplay(record)}
                                        </td>
                                        <td className="py-4 px-6">
                                            {dayType.label !== '-' ? (
                                                <span className={`badge ${dayType.className}`}>
                                                    {dayType.label}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400">-</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={`badge ${
                                                    record.status === 'Present'
                                                        ? 'badge-success'
                                                        : record.status === 'Late'
                                                        ? 'badge-warning'
                                                        : 'badge-danger'
                                                }`}
                                            >
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceHistory;
