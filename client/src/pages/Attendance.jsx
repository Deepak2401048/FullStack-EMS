import { useState, useEffect, useCallback } from 'react';
import { dummyAttendanceData } from '../assets/assets';
import Loading from '../components/Loading';
import AttendanceStats from '../components/Attendance/AttendanceStats';
import AttendanceHistory from '../components/Attendance/AttendanceHistory';
import CheckInButton from '../components/Attendance/CheckInButton';

const Attendance = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setHistory(dummyAttendanceData);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return <Loading />;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRecord = history.find(
        (r) => new Date(r.date).toDateString() === today.toDateString()
    );

    return (
        <div className="animate-fade-in px-4 sm:px-6 lg:px-8">
            <div className="page-header">
                <h1 className="page-title">Attendance</h1>
                <p className="page-subtitle">Track your daily attendance and working hours</p>
            </div>

            {isDeleted ? (
                <div className="mb-6 p-4 bg-rose-50 text-rose-600 rounded-lg border border-rose-200">
                    Your account is deactivated. You cannot mark attendance.
                </div>
            ) : (
                <div className="mb-6">
                    <div className="max-w-3xl">
                        <CheckInButton todayRecord={todayRecord} onAction={fetchData} />
                    </div>
                </div>
            )}

            <div className="max-w-6xl">
                <AttendanceStats history={history} />
                <AttendanceHistory history={history} />
            </div>
        </div>
    );
};

export default Attendance;

