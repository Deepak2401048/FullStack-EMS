
import {Toaster} from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import LoginLanding from './pages/LoginLanding'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Attendance from './pages/Attendance'
import Payslip from './pages/Payslip'
import PrintPayslip from './pages/PrintPayslip'
import Setting from './pages/Setting'
import Leave from './pages/Leave'
import { Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
const App = () => {
  return (
    <>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Navigate to="/Dashboard" replace/>}/>
        <Route path="/Login" element={<LoginLanding />} />
        <Route path="/login/admin" element={ <LoginForm role="admin" title="Admin Portal" subtitle="Sign in to manage the organization"/> }/>

        <Route path="/login/employee" element={ <LoginForm role="employee" title="Employee Portal" subtitle="Sign in to access your account"/> }/>      
        <Route element={<Layout/>}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Employees" element={<Employees />} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/Payslip" element={<Payslip />} />
          <Route path="/PrintPayslip" element={<PrintPayslip />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/Leave" element={<Leave />} />
        </Route> 
        <Route path="/print/payslip/:id" element={<PrintPayslip/>}/>
        <Route path="*" element={<Navigate to="/Login" replace/>}/>
      </Routes>
    </>
   
  )
}
export default App;
