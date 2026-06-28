import { useEffect, useMemo, useState } from 'react'
import { Search, Plus, X, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'
import { DEPARTMENTS, dummyEmployeeData } from '../assets/assets'
import EmployeeCard from '../components/EmployeeCard'

const EMPLOYEES_STORAGE_KEY = 'emsEmployees'

const ALLOWED_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'icloud.com',
  'proton.me',
  'protonmail.com',
])

const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contract', 'Intern']
const WORK_LOCATIONS = ['On-site', 'Remote', 'Hybrid']

const isEmailDomainAllowed = (email) => {
  const domain = email?.trim().split('@')[1]?.toLowerCase()
  return domain ? ALLOWED_EMAIL_DOMAINS.has(domain) : false
}


const getInitialEmployees = () => {
  try {
    const savedEmployees = localStorage.getItem(EMPLOYEES_STORAGE_KEY)
    const parsedEmployees = savedEmployees ? JSON.parse(savedEmployees) : null

    return Array.isArray(parsedEmployees) && parsedEmployees.length > 0
      ? parsedEmployees
      : dummyEmployeeData
  } catch {
    return dummyEmployeeData
  }
}

const getDateInputValue = (date) => {
  if (!date) {
    return ''
  }

  return new Date(date).toISOString().slice(0, 10)
}

const toIsoStringOrEmpty = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return Number.isNaN(d.getTime()) ? '' : d.toISOString()
}

const isDobAtLeast18YearsOld = (dobStr) => {
  if (!dobStr) return false
  const dob = new Date(dobStr)
  if (Number.isNaN(dob.getTime())) return false

  const now = new Date()
  const minDobYear = now.getFullYear() - 18
  // Build a date at midnight for robust comparisons
  const comparisonDate = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate())
  const eighteenYearsAgo = new Date(minDobYear, now.getMonth(), now.getDate())

  return comparisonDate <= eighteenYearsAgo
}

const isJoinDateWithin6MonthsAhead = (joinDateStr) => {
  if (!joinDateStr) return false
  const join = new Date(joinDateStr)
  if (Number.isNaN(join.getTime())) return false

  const now = new Date()
  const maxJoin = new Date(now)
  maxJoin.setMonth(maxJoin.getMonth() + 6)

  return join <= maxJoin
}

const getEmployeeFormData = (employee) => ({
  employeeCode: employee?.employeeCode || '',
  firstName: employee?.firstName || '',
  lastName: employee?.lastName || '',
  email: employee?.email || '',
  phone: employee?.phone || '',
  position: employee?.position || '',
  department: employee?.department || '',
  joinDate: getDateInputValue(employee?.joinDate),
  employmentStatus: employee?.employmentStatus || 'ACTIVE',
  employmentType: employee?.employmentType || 'Full-time',
  workLocation: employee?.workLocation || 'On-site',
  managerName: employee?.managerName || '',
  emergencyContactName: employee?.emergencyContactName || '',
  emergencyContactPhone: employee?.emergencyContactPhone || '',
  address: employee?.address || '',
  bio: employee?.bio || '',
  basicSalary:
    typeof employee?.basicSalary === 'number'
      ? employee.basicSalary
      : employee?.basicSalary || 0,
  allowances:
    typeof employee?.allowances === 'number'
      ? employee.allowances
      : employee?.allowances || 0,
  deductions:
    typeof employee?.deductions === 'number'
      ? employee.deductions
      : employee?.deductions || 0,
  dateOfBirth: getDateInputValue(employee?.dateOfBirth),
})

const createEmployeeId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `employee-${Date.now()}`
}

const createEmployeeCode = (employees) => {
  const highestNumber = employees.reduce((highest, employee) => {
    const codeNumber = Number(employee.employeeCode?.match(/^EMP-(\d+)$/i)?.[1])
    return Number.isFinite(codeNumber) ? Math.max(highest, codeNumber) : highest
  }, 0)
  const nextNumber = highestNumber + 1
  return `EMP-${String(nextNumber).padStart(4, '0')}`
}

const Employees = () => {
  const [employees, setEmployees] = useState(getInitialEmployees)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [isAddingEmployee, setIsAddingEmployee] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [deletingEmployee, setDeletingEmployee] = useState(null)
  const [formData, setFormData] = useState(getEmployeeFormData())

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees))
  }, [employees])

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
        employee.employeeCode,
        employee.employmentType,
        employee.workLocation,
        employee.managerName,
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

  const openAddModal = () => {
    setIsAddingEmployee(true)
    setEditingEmployee(null)
    setFormData({
      ...getEmployeeFormData(),
      employeeCode: createEmployeeCode(employees),
    })
  }

  const handleEdit = (employee) => {
    setIsAddingEmployee(false)
    setEditingEmployee(employee)
    setFormData(getEmployeeFormData(employee))
  }

  const handleDelete = (employee) => {
    setDeletingEmployee(employee)
  }

  const closeDeleteModal = () => {
    setDeletingEmployee(null)
  }

  const confirmDeleteEmployee = () => {
    setEmployees((currentEmployees) =>
      currentEmployees.filter((item) => item.id !== deletingEmployee.id)
    )
    closeDeleteModal()
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  const closeEmployeeModal = () => {
    setIsAddingEmployee(false)
    setEditingEmployee(null)
    setFormData(getEmployeeFormData())
  }

  const handleSaveEmployee = (event) => {
    event.preventDefault()

    const dobIso = toIsoStringOrEmpty(formData.dateOfBirth)
    const joinIso = toIsoStringOrEmpty(formData.joinDate)

    if (!isDobAtLeast18YearsOld(formData.dateOfBirth)) {
      toast.error('Employee must be at least 18 years old (valid Date of Birth required).')
      return
    }

    if (!isJoinDateWithin6MonthsAhead(formData.joinDate)) {
      toast.error('Date of joining cannot be more than 6 months ahead of today.')
      return
    }

    const cleanedFormData = {
      employeeCode: formData.employeeCode.trim(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      position: formData.position.trim(),
      department: formData.department,
      joinDate: joinIso,
      employmentStatus: formData.employmentStatus,
      employmentType: formData.employmentType,
      workLocation: formData.workLocation,
      managerName: formData.managerName.trim(),
      emergencyContactName: formData.emergencyContactName.trim(),
      emergencyContactPhone: formData.emergencyContactPhone.trim(),
      address: formData.address.trim(),
      bio: formData.bio.trim(),
      basicSalary: Number(formData.basicSalary) || 0,
      allowances: Number(formData.allowances) || 0,
      deductions: Number(formData.deductions) || 0,
      dateOfBirth: dobIso,
    }

    if (!cleanedFormData.employeeCode) {
      toast.error('Employee code is required')
      return
    }

    if (!isEmailDomainAllowed(cleanedFormData.email)) {
      toast.dismiss()
      toast.error(
        'Invalid email domain. Use a popular domain like gmail.com, yahoo.com, outlook.com, hotmail.com, live.com, icloud.com, proton.me, protonmail.com'
      )
      return
    }


    const emailExists = employees.some(
      (employee) =>
        employee.email?.toLowerCase() === cleanedFormData.email &&
        employee.id !== editingEmployee?.id
    )

    if (emailExists) {
      toast.error('An employee with this email already exists')
      return
    }

    const employeeCodeExists = employees.some(
      (employee) =>
        employee.employeeCode?.toLowerCase() === cleanedFormData.employeeCode.toLowerCase() &&
        employee.id !== editingEmployee?.id
    )

    if (employeeCodeExists) {
      toast.error('An employee with this employee code already exists')
      return
    }


    if (isAddingEmployee) {
      const id = createEmployeeId()

      setEmployees((currentEmployees) => [
        {
          ...cleanedFormData,
          _id: id,
          id,
          userId: {
            _id: id,
            email: cleanedFormData.email,
            role: 'EMPLOYEE',
          },
          user: {
            email: cleanedFormData.email,
            role: 'EMPLOYEE',
          },
          image: null,
          isDeleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...currentEmployees,
      ])
      setSearch('')
      setSelectedDepartment('')
      toast.success('Employee added')
    } else {
      setEmployees((currentEmployees) =>
        currentEmployees.map((employee) =>
          employee.id === editingEmployee.id
            ? {
                ...employee,
                ...cleanedFormData,
                userId: employee.userId
                  ? { ...employee.userId, email: cleanedFormData.email }
                  : employee.userId,
                user: employee.user
                  ? { ...employee.user, email: cleanedFormData.email }
                  : employee.user,
                updatedAt: new Date().toISOString(),
              }
            : employee
        )
      )
      toast.success('Employee updated')
    }

    closeEmployeeModal()
  }

  const isEmployeeModalOpen = isAddingEmployee || editingEmployee

  return (
    <div className="animate-fade-in">
      {/* Sticky top controls */}
      <div
        className="sticky top-0 z-20 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70"
      >
        <div className="pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 px-1 sm:pl-0 pl-12">
            <div>
              <h1 className="page-title">Employees</h1>
              <p className="page-subtitle">Manage your team members</p>
            </div>
            <button
              type="button"
              onClick={openAddModal}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Plus className="size-4" /> Add Employee
            </button>
          </div>

          {/* Search Bar + Filters (mobile expandable) */}
          <div className="flex flex-col gap-3 mb-6 px-1">
            {/* Mobile: Filters button */}
            <div className="flex items-center gap-3 sm:hidden">
              <button
                type="button"
                onClick={() => {
                  const next = !document.documentElement.dataset.emFiltersOpen
                  document.documentElement.dataset.emFiltersOpen = next ? 'true' : ''
                  const el = document.getElementById('employee-filters')
                  if (el) el.style.display = next ? 'block' : 'none'
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"
                aria-label="Toggle filters"
              >
                <Search className="size-4" />
                <span>Filters</span>
              </button>
            </div>

            {/* Desktop + Mobile expanded */}
            <div
              id="employee-filters"
              className="flex flex-col sm:flex-row sm:items-center gap-4"
              style={{ display: 'flex' }}
            >
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
          </div>

        </div>
      </div>

      {/* Employee Cards List (scrollable) */}
      <div className="h-[calc(100vh-220px)] overflow-y-auto pr-1">
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
      </div>


      {isEmployeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4 py-8 backdrop-blur-sm backdrop-saturate-150 sm:py-10">
          <div className="flex max-h-[calc(100vh-5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl sm:max-h-[calc(100vh-6rem)]">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {isAddingEmployee ? 'Add Employee' : 'Edit Employee'}
                </h2>
                <p className="text-sm text-slate-500">
                  {isAddingEmployee
                    ? 'Create a new team member'
                    : 'Update employee details'}
                </p>
              </div>
              <button
                type="button"
                onClick={closeEmployeeModal}
                className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close employee modal"
              >
                <X className="size-5" />
              </button>
            </div>

            <form
              onSubmit={handleSaveEmployee}
              className="space-y-6 overflow-y-auto px-6 py-5"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Personal Info</h3>
                  <p className="text-xs text-slate-500">Basic identity and contact details.</p>
                </div>
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
                      type="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="9000000001"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Date of birth (DOB)
                    </label>
                    <input
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleFormChange}
                      required
                      max={(() => {
                        const d = new Date()
                        d.setFullYear(d.getFullYear() - 18)
                        return d.toISOString().slice(0, 10)
                      })()}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-200 pt-5">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Job Details</h3>
                  <p className="text-xs text-slate-500">Role, department, status, and reporting information.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Employee code
                    </label>
                    <input
                      name="employeeCode"
                      value={formData.employeeCode}
                      onChange={handleFormChange}
                      placeholder="EMP-0001"
                      required
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
                      Employment type
                    </label>
                    <select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleFormChange}
                      required
                    >
                      {EMPLOYMENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Work location
                    </label>
                    <select
                      name="workLocation"
                      value={formData.workLocation}
                      onChange={handleFormChange}
                      required
                    >
                      {WORK_LOCATIONS.map((location) => (
                        <option key={location} value={location}>
                          {location}
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
                      required
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Date of joining (DOJ)
                    </label>
                    <input
                      name="joinDate"
                      type="date"
                      value={formData.joinDate}
                      onChange={handleFormChange}
                      required
                      min={new Date().toISOString().slice(0, 10)}
                      max={(() => {
                        const d = new Date()
                        d.setMonth(d.getMonth() + 6)
                        return d.toISOString().slice(0, 10)
                      })()}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Manager
                    </label>
                    <input
                      name="managerName"
                      value={formData.managerName}
                      onChange={handleFormChange}
                      placeholder="Reporting manager"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-200 pt-5">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Compensation</h3>
                  <p className="text-xs text-slate-500">Payroll inputs used for salary and payslip calculations.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Basic Salary
                    </label>
                    <input
                      name="basicSalary"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      value={formData.basicSalary}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Allowances
                    </label>
                    <input
                      name="allowances"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      value={formData.allowances}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Deductions
                    </label>
                    <input
                      name="deductions"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      value={formData.deductions}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-200 pt-5">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Emergency Contact</h3>
                  <p className="text-xs text-slate-500">Optional contact details for urgent situations.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Emergency contact name
                    </label>
                    <input
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleFormChange}
                      placeholder="Contact person"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Emergency contact phone
                    </label>
                    <input
                      name="emergencyContactPhone"
                      type="tel"
                      inputMode="tel"
                      value={formData.emergencyContactPhone}
                      onChange={handleFormChange}
                      placeholder="Emergency number"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-200 pt-5">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Additional Details</h3>
                  <p className="text-xs text-slate-500">Address and profile notes.</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      rows={3}
                      placeholder="Current residential address"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleFormChange}
                      rows={4}
                      placeholder="Brief employee profile, skills, or notes"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEmployeeModal}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {isAddingEmployee ? 'Add Employee' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4 py-8 backdrop-blur-sm backdrop-saturate-150 sm:py-10">
          <div className="flex max-h-[calc(100vh-5rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-xl sm:max-h-[calc(100vh-6rem)]">
            <div className="px-6 py-5">
              <div className="mb-4 flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                  <AlertTriangle className="size-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Delete employee?
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    This will remove {deletingEmployee.firstName} {deletingEmployee.lastName} from the employee list.
                  </p>
                </div>
              </div>

              <div className="rounded-md border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                This action cannot be undone in the current session.
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteEmployee}
                className="rounded-md bg-rose-600 px-5 py-2.5 text-sm text-white transition-colors hover:bg-rose-700 active:scale-[0.98]"
              >
                Delete Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Employees
