import { CalendarIcon, FileTextIcon, DollarSignIcon, ArrowRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const EmployeeDashboard = ({ data }) => {
  const emp = data.employee;

  const cards = [
    {
      icon: CalendarIcon,
      value: data.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This month",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting approval",
    },
    {
      icon: DollarSignIcon,
      value: data.payslips ? `$${data.latestPayslip?.netSalary?.toLocaleString()}` : "N/A",
      title: "Latest Payslip",
      subtitle: "Most recent payout",
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header Section */}
      <div className="page-header">
        <h1 className="page-title">
          Welcome, {emp?.firstName}!
        </h1>
        <p className="page-subtitle">
          {emp?.position} - {emp?.department || "No Department"}
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="card p-6 flex items-center gap-4 relative group hover:-translate-y-1 transition-transform cursor-pointer">
            {/* Hover Vertical Line Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-l opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
              <card.icon className="size-6" />
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              <p className="text-xs text-slate-400 mt-1">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action Links */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link 
          to="/attendance" 
          className="btn-primary flex items-center justify-center gap-2"
        >
          Mark Attendance <ArrowRightIcon className="size-4" />
        </Link>
        <Link 
          to="/leave" 
          className="btn-secondary text-center"
        >
          Apply for Leave
        </Link>
      </div>
    </div>
  )
}

export default EmployeeDashboard
