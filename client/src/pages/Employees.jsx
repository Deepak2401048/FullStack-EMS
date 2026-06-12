import { useEffect, useMemo, useState } from 'react'
import { Search, Plus, X } from 'lucide-react'
import { DEPARTMENTS, dummyEmployeeData } from '../assets/assets'
import EmployeeCard from '../components/EmployeeCard'

const getEmployeeFormData = (employee) => ({
  firstName: employee?.firstName || '',
  lastName: employee?.lastName || '',
  email: employee?.email || '',
  phone: employee?.phone || '',
  position: employee?.position || '',
  department: employee?.department || '',
  employmentStatus: employee?.employmentStatus || 'ACTIVE',
})

const Employees = () => {
  const [employees, setEmployees] = useState(dummyEmployeeData)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [formData, setFormData] = useState(getEmployeeFormData())

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    const searchTerms = search
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)

    return employees.filter((employee) => {
      const matchesDepartment = selectedDepartment
        ? employee.department === selectedDepartment
        : true

      const searchableText = [
        employee.firstName,
        employee.lastName,
        employee.position,
        employee.department,
        employee.email,
        employee.phone,
        employee.employmentStatus,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesSearch = searchTerms.every((term) =>
        searchableText.includes(term)
      )

      return matchesDepartment && matchesSearch
    })
  }, [employees, search, selectedDepartment])

  const handleEdit = (employee) => {
    setEditingEmployee(employee)
    setFormData(getEmployeeFormData(employee))
  }

  const handleDelete = (employee) => {
    setEmployees((currentEmployees) =>
      currentEmployees.filter((item) => item.id !== employee.id)
    )
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  const closeEditModal = () => {
    setEditingEmployee(null)
    setFormData(getEmployeeFormData())
  }

  const handleUpdateEmployee = (event) => {
    event.preventDefault()

    setEmployees((currentEmployees) =>
      currentEmployees.map((employee) =>
        employee.id === editingEmployee.id
          ? { ...employee, ...formData }
          : employee
      )
    )

    closeEditModal()
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>
        <button className="btn-primary flex items-center justify-center gap-2">
          <Plus className="size-4" /> Add Employee
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="w-full sm:max-w-xs py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Cards List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin size-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-slate-500 py-12">
              No employees found
            </p>
          ) : (
            filtered.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      )}

      {editingEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Edit Employee</h2>
                <p className="text-sm text-slate-500">
                  Update employee details
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close edit employee modal"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateEmployee} className="space-y-5 px-6 py-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    First name
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Position
                  </label>
                  <input
                    name="position"
                    value={formData.position}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select department</option>
                    {DEPARTMENTS.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>
                  <select
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleFormChange}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Employees
