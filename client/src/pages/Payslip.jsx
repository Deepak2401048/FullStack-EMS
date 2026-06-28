import { useState, useCallback, useEffect } from 'react';
import { dummyPayslipData, dummyEmployeeData } from '../assets/assets';
import Loading from '../components/Loading';
import PayslipList from '../components/payslip/PayslipList';
import GeneratePayslipForm from '../components/payslip/GeneratePayslipForm';

const Payslips = () => {
    const [payslips, setPayslips] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true); // Role toggle for testing

    const fetchPayslips = useCallback(async () => {
        setPayslips(dummyPayslipData);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        fetchPayslips();
    }, [fetchPayslips]);

    useEffect(() => {
        if (isAdmin) {
            setEmployees(dummyEmployeeData);
        }
    }, [isAdmin]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="page-title">Payslips</h1>
                    <p className="page-subtitle">
                        {isAdmin ? 'Generate and manage employee payslips' : 'Your payslip history'}
                    </p>
                </div>
            </div>

            {isAdmin ? (
                <div className="space-y-6">
                    <div className="flex justify-end">
                        <GeneratePayslipForm employees={employees} onSuccess={fetchPayslips} />
                    </div>
                    <PayslipList payslips={payslips} isAdmin={isAdmin} />
                </div>
            ) : (
                <PayslipList payslips={payslips} isAdmin={isAdmin} />
            )}
        </div>
    );
};

export default Payslips;