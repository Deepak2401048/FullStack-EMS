import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, User, LayoutGrid, Calendar, 
  FileText, DollarSign, Settings, LogOut 
} from 'lucide-react';
import { dummyProfileData } from '../assets/assets';

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const username = dummyProfileData.firstName + ' ' + dummyProfileData.lastName;
  const [role] = useState(() => {
    const savedRole = localStorage.getItem('emsRole');
    return savedRole === 'admin' ? 'admin' : 'employee';
  });
  const [mobileMenu, setMobileMenu] = useState(false);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('emsRole');
    navigate('/login');
  };

  // Dynamic Navigation Items
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    ...(role === 'admin' ? [{ name: 'Employees', href: '/employees', icon: User }] : []),
    { name: 'Attendance', href: '/attendance', icon: Calendar },
    { name: 'Leave', href: '/leave', icon: FileText },
    { name: 'Payslips', href: '/payslip', icon: DollarSign },
    { name: 'Settings', href: '/setting', icon: Settings },
  ];

  // The inner content of the sidebar separated out so it can be used 
  // for both the Desktop and Mobile views
  const sidebarContent = (
    <>
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
          <User className="text-white" size={28} />
          <div>
            <p className="font-bold text-lg leading-tight">Employee MS</p>
            <p className="text-xs text-gray-400">Management System</p>
          </div>
        </div>
        <button 
          className="lg:hidden text-gray-400 hover:text-white" 
          onClick={() => setMobileMenu(false)}
        >
          <X size={20} />
        </button>
      </div>

      {/* User Profile Card */}
      {username && (
        <div className="p-4 mx-3 my-5 bg-gray-800 rounded-lg flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-md flex items-center justify-center font-bold text-xl text-white">
            <span>{username.charAt(0).toUpperCase()}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm truncate">{username}</p>
            <p className="text-xs text-gray-400 truncate">
              {role === 'admin' ? 'Administrator' : 'Employee'}
            </p>
          </div>
        </div>
      )}

      {/* Navigation Label */}
      <div className="px-5 mb-2">
        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
          Navigation
        </p>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          // Checks if the current path starts with the item's href
          const isActive = pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setMobileMenu(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                isActive 
                  ? 'bg-indigo-500/10 text-indigo-300' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white group'
              }`}
            >
              <item.icon 
                size={20} 
                className={isActive ? 'text-indigo-300' : 'text-gray-400 group-hover:text-gray-300'} 
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout Link */}
      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 rounded-md text-white shadow-md"
        onClick={() => setMobileMenu(true)}
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay (Semi-transparent black background behind the menu) */}
      {mobileMenu && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* Sidebar Desktop View */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-gray-900 text-white fixed top-0 left-0">
        {sidebarContent}
      </aside>

      {/* Sidebar Mobile View */}
      <aside 
        className={`fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white z-50 flex flex-col transform transition-transform duration-300 lg:hidden ${
          mobileMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
