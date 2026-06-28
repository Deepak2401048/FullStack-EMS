import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dummyPayslipData } from '../assets/assets';
import Loading from '../components/Loading';
import { format } from 'date-fns';

const PrintPayslip = () => {
    const { id } = useParams();
    const [payslip, setPayslip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = dummyPayslipData.find((slip) => slip.id === id);
        setPayslip(data);
        
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (!payslip) {
        return <p className="text-center p-4 text-slate-500">Payslip not found</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white my-8 rounded-xl shadow-sm border border-slate-200">
            {/* Header */}
            <div className="text-center mb-8 pb-8 border-b border-slate-200">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Payslip</h1>
                <p className="text-slate-500">
                    {format(new Date(payslip.year, payslip.month - 1), 'MMMM yyyy')}
                </p>
            </div>

            {/* Employee Details Grid */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <p className="text-sm text-slate-500 mb-1">Employee Name</p>
                    <p className="font-medium text-slate-800">
                        {payslip.employee?.firstName} {payslip.employee?.lastName}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-slate-500 mb-1">Position</p>
                    <p className="font-medium text-slate-800">{payslip.employee?.position}</p>
                </div>
                <div>
                    <p className="text-sm text-slate-500 mb-1">Email</p>
                    <p className="font-medium text-slate-800">{payslip.employee?.email}</p>
                </div>
                <div>
                    <p className="text-sm text-slate-500 mb-1">Period</p>
                    <p className="font-medium text-slate-800">
                        {format(new Date(payslip.year, payslip.month - 1), 'MMMM yyyy')}
                    </p>
                </div>
            </div>

            {/* Salary Breakdown Table */}
            <div className="mb-8">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="py-3 px-4 text-sm font-medium text-slate-600 border-b border-slate-200">Description</th>
                            <th className="py-3 px-4 text-sm font-medium text-slate-600 border-b border-slate-200 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr>
                            <td className="py-4 px-4 text-slate-600">Basic Salary</td>
                            <td className="py-4 px-4 text-slate-800 font-medium text-right">
                                ${payslip.basicSalary?.toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-4 px-4 text-slate-600">Allowance</td>
                            <td className="py-4 px-4 text-emerald-600 font-medium text-right">
                                + ${payslip.allowances?.toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-4 px-4 text-slate-600">Deductions</td>
                            <td className="py-4 px-4 text-rose-600 font-medium text-right">
                                - ${payslip.deductions?.toLocaleString()}
                            </td>
                        </tr>
                        <tr className="bg-slate-50">
                            <td className="py-4 px-4 font-bold text-slate-800 border-t-2 border-slate-200">Net Salary</td>
                            <td className="py-4 px-4 font-bold text-slate-800 border-t-2 border-slate-200 text-right text-lg">
                                ${payslip.netSalary?.toLocaleString()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Print Action */}
            <div className="text-center pt-8 print:hidden">
                <button
                    onClick={() => window.print()}
                    className="btn-primary px-8 py-2.5"
                >
                    Print Payslip
                </button>
            </div>
        </div>
    );
};

export default PrintPayslip;