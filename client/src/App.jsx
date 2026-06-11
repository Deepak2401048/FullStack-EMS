
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
        <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
        <Route path="/login" element={<LoginLanding />} />
        <Route path="/login/admin" element={ <LoginForm role="admin" title="Admin Portal" subtitle="Sign in to manage the organization"/> }/>

        <Route path="/login/employee" element={ <LoginForm role="employee" title="Employee Portal" subtitle="Sign in to access your account"/> }/>      
        <Route element={<Layout/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/payslip" element={<Payslip />} />
          <Route path="/printPayslip" element={<PrintPayslip />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/leave" element={<Leave />} />
        </Route> 
        <Route path="/payslips" element={<Navigate to="/payslip" replace/>}/>
        <Route path="/settings" element={<Navigate to="/setting" replace/>}/>
        <Route path="/print/payslip/:id" element={<PrintPayslip/>}/>
        <Route path="*" element={<Navigate to="/login" replace/>}/>
      </Routes>
    </>
   
  )
}
export default App;
