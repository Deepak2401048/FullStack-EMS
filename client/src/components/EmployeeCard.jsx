import { PencilIcon, Trash2Icon } from 'lucide-react'

const EmployeeCard = ({ employee, onEdit, onDelete }) => {

  return (
    <div className="card overflow-hidden relative group">
      
      {/* Top Banner Section */}
      <div className="relative aspect-[4/1] bg-slate-100">
        
        {/* Department & Status Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge badge-info bg-white/90 backdrop-blur-sm">
            {employee?.department || 'Remote'}
          </span>
          {employee?.isDeleted && (
            <span className="badge badge-danger">
              Deleted
            </span>
          )}
        </div>

        {/* Hover Actions (Edit / Delete) - Hidden if employee is deleted */}
        {!employee?.isDeleted && (
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit?.(employee)}
              className="p-2 bg-white text-slate-600 hover:text-indigo-600 rounded-lg shadow-sm transition-colors"
              title="Edit Employee"
            >
              <PencilIcon className="size-4" />
            </button>
            <button 
              onClick={() => onDelete?.(employee)}
              className="p-2 bg-white text-slate-600 hover:text-red-600 rounded-lg shadow-sm transition-colors"
              title="Delete Employee"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        )}

        {/* Circular Avatar / Initials overlapping the banner */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <div className="size-20 rounded-full bg-indigo-50 border-4 border-white shadow-sm flex items-center justify-center text-xl font-bold text-indigo-600">
            <span>
              {employee?.firstName?.charAt(0)?.toUpperCase()}
              {employee?.lastName?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Information Section */}
      <div className="pt-14 pb-6 px-6 text-center">
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          {employee?.firstName} {employee?.lastName}
        </h3>
        <p className="text-sm font-medium text-slate-500">
          {employee?.position}
        </p>
      </div>
      
    </div>
  )
}

export default EmployeeCard
