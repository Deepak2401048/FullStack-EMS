import { UserIcon, Building2Icon, CalendarIcon, FileTextIcon } from 'lucide-react'

const AdminDashboard = ({ data }) => {

  const stats = [
    {
      label: "Total Employees",
      icon: UserIcon,
      value: data.totalEmployees,
      description: "Active workforce",
    },
    {
      label: "Departments",
      icon: Building2Icon,
      value: data.totalDepartments,
      description: "Organization units",
    },
    {
      label: "Today's Attendance",
      icon: CalendarIcon,
      value: data.todayAttendance,
      description: "Checked in today",
    },
    {
      label: "Pending Leaves",
      icon: FileTextIcon,
      value: data.pendingLeaves,
      description: "Awaiting approval",
    }
  ]

  return (
    <div className="animate-fade-in">
      {/* Header Section */}
      <div className="page-header">
        <h1 className="page-title">
          Dashboard
        </h1>
        <p className="page-subtitle">
          Welcome back Admin, here is your overview
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card p-6 flex items-center gap-4 relative group hover:-translate-y-1 transition-transform cursor-pointer">
            {/* Hover Vertical Line Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-l opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
              <s.icon className="size-6" />
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-500">{s.label}</p>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
