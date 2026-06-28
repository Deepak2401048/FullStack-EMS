import { format } from 'date-fns';
import { Download } from 'lucide-react';

const PayslipList = ({ payslips, isAdmin }) => {
    return (
        <div className="card overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="scrollbar-thin overflow-x-auto overflow-y-auto max-h-[70vh]">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            {isAdmin && <th className="py-3 px-6 text-sm font-medium text-slate-600">Employee</th>}
                            <th className="py-3 px-6 text-sm font-medium text-slate-600">Period</th>
                            <th className="py-3 px-6 text-sm font-medium text-slate-600">Basic Salary</th>
                            <th className="py-3 px-6 text-sm font-medium text-slate-600">Net Salary</th>
                            <th className="py-3 px-6 text-sm font-medium text-slate-600 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {payslips.length === 0 ? (
                            <tr>
                                <td colSpan={isAdmin ? 5 : 4} className="py-12 text-center text-slate-400">
                                    No payslips found
                                </td>
                            </tr>
                        ) : (
                            payslips.map((payslip) => (
                                <tr key={payslip.id} className="hover:bg-slate-50 transition-colors">
                                    {isAdmin && (
                                        <td className="py-4 px-6">
                                            <span className="font-medium text-slate-900">
                                                {payslip.employee?.firstName} {payslip.employee?.lastName}
                                            </span>
                                        </td>
                                    )}
                                    <td className="py-4 px-6 text-slate-500">
                                        {format(new Date(payslip.year, payslip.month - 1), 'MMM, yyyy')}
                                    </td>
                                    <td className="py-4 px-6 text-slate-500">
                                        ${payslip.basicSalary?.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-6 text-slate-800 font-medium">
                                        ${payslip.netSalary?.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <button
                                            onClick={() => window.open(`/print/payslip/${payslip.id}`)}
                                            className="p-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayslipList;
