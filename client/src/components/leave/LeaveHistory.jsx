import { useState } from 'react';
import { format } from 'date-fns';
import { Check, X, Loader2 } from 'lucide-react';

const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
    const [processing, setProcessing] = useState(null);

    const handleStatusUpdate = async (id, status) => {
        setProcessing(id);
        // API Call logic will go here
    };

    return (
        <div className="card overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="scrollbar-thin overflow-x-auto overflow-y-auto max-h-[70vh]">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            {isAdmin && <th className="py-3 px-6 text-sm font-medium text-slate-600">Employee</th>}
                            <th className="py-3 px-6 text-sm font-medium text-slate-600">Type</th>
                            <th className="py-3 px-6 text-sm font-medium text-slate-600">Dates</th>
                            <th className="py-3 px-6 text-sm font-medium text-slate-600">Reason</th>
                            <th className="py-3 px-6 text-sm font-medium text-slate-600">Status</th>
                            {isAdmin && <th className="py-3 px-6 text-sm font-medium text-slate-600 text-center">Action</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {leaves.length === 0 ? (
                            <tr>
                                <td colSpan={isAdmin ? 6 : 4} className="py-12 text-center text-slate-400">
                                    No leave applications found
                                </td>
                            </tr>
                        ) : (
                            leaves.map((leave) => (
                                <tr key={leave.id} className="hover:bg-slate-50 transition-colors">
                                    {isAdmin && (
                                        <td className="py-4 px-6">
                                            <span className="text-slate-900 font-medium">
                                                {leave.employee?.firstName} {leave.employee?.lastName}
                                            </span>
                                        </td>
                                    )}
                                    <td className="py-4 px-6">
                                        <span className="font-medium text-slate-800">{leave.type}</span>
                                    </td>
                                    <td className="py-4 px-6 text-xs text-slate-500">
                                        {format(new Date(leave.startDate), 'MMM dd')} - {format(new Date(leave.endDate), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-600 truncate max-w-xs" title={leave.reason}>
                                        {leave.reason}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`badge ${
                                            leave.status === 'Approved' ? 'badge-success' :
                                            leave.status === 'Rejected' ? 'badge-danger' : 'badge-warning'
                                        }`}>
                                            {leave.status}
                                        </span>
                                    </td>
                                    {isAdmin && (
                                        <td className="py-4 px-6">
                                            {leave.status === 'Pending' && (
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(leave.id, 'Approved')}
                                                        disabled={processing === leave.id}
                                                        className="p-1.5 bg-emerald-50 text-emerald-600 rounded hover:bg-emerald-100 disabled:opacity-50"
                                                    >
                                                        {processing === leave.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(leave.id, 'Rejected')}
                                                        disabled={processing === leave.id}
                                                        className="p-1.5 bg-rose-50 text-rose-600 rounded hover:bg-rose-100 disabled:opacity-50"
                                                    >
                                                        {processing === leave.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveHistory;
