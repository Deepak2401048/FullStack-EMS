import { useState } from 'react';
import { X, FileText, CalendarDays, Loader2, Send } from 'lucide-react';

const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // API Submission Logic will go here
        
        // Simulating API success for now
        setTimeout(() => {
            setLoading(false);
            onSuccess();
            onClose();
        }, 1000);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Apply for Leave</h2>
                        <p className="text-sm text-slate-500">Submit your leave request for approval</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                            <FileText className="w-4 h-4 text-slate-400" />
                            Leave Type
                        </label>
                        <select name="type" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                            <option value="Sick">Sick Leave</option>
                            <option value="Casual">Casual Leave</option>
                            <option value="Annual">Annual Leave</option>
                        </select>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                            <CalendarDays className="w-4 h-4 text-slate-400" />
                            Duration
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <span className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-slate-400 z-10">From</span>
                                <input
                                    type="date"
                                    name="startDate"
                                    required
                                    min={minDate}
                                    className="w-full px-4 pt-5 pb-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                />
                            </div>
                            <div className="relative">
                                <span className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-slate-400 z-10">To</span>
                                <input
                                    type="date"
                                    name="endDate"
                                    required
                                    min={minDate}
                                    className="w-full px-4 pt-5 pb-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Reason</label>
                        <textarea name="reason" required rows="3" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none" placeholder="Please provide a reason..."></textarea>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyLeaveModal;