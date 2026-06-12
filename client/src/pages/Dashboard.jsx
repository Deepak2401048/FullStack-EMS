import { useEffect, useState } from "react"
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from "../assets/assets"
import Loading from "../components/Loading"
import EmployeeDashboard from "../components/EmployeeDashboard"
import AdminDashboard from "../components/AdminDashboard"

const getDashboardData = () => {
  const savedRole = localStorage.getItem("emsRole")

  return savedRole === "employee"
    ? dummyEmployeeDashboardData
    : dummyAdminDashboardData
}

const Dashboard = () => {
  const [data] = useState(getDashboardData)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoading(false)
    },1000)

    return () => clearTimeout(timer)
  },[])

  if(loading) return <Loading />

  if(!data) return <p className="text-center text-red-500 py-4">Failed to load dashboard</p>

  if(data.role?.toLowerCase() === 'admin'){
    return <AdminDashboard data={data} />
  }

  return <EmployeeDashboard data={data} />
}

export default Dashboard
