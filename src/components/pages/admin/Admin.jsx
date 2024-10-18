import React,{useState} from 'react'
import AdminDashboard from '../AdminDashboard'
import NavBarlayer from '../../layout/NavBarlayer'
import { logout } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';

const Admin = () => {
  
     const [showMenu, setShowMenu] = useState(false);
     const dispatch = useDispatch();

     const navItems = [
      { name: 'Dashboard', href: '/dashboard', icon: 'ri-dashboard-line' },
      { name: 'Employees', href: '/employees', icon: 'ri-user-line' },
      { name: 'Company', href: '/company', icon: 'ri-building-line' },
      { name: 'Attendance', href: '/attandance', icon: 'ri-time-line' },
      { name: 'Leave', href: '/leave', icon: 'ri-plane-line' },
      { name: 'Review', href: '/review', icon: 'ri-file-list-2-line' },
      { name: 'Settings', href: '/settings', icon: 'ri-settings-2-line' },
      { name: 'Profile', href: '/profile', icon: 'ri-user-3-line' },
      { name: 'Payroll', href: '/admin-payroll', icon: 'ri-money-dollar-circle-line' }, // Added admin payroll option
    ];

return (
<div className="flex">
<aside className="w-64 border-r-4 fixed bg-white h-screen shadow-2xl">
  <div className="p-4">
    <h1 className="text-xl font-bold text-blue-500">StarGame</h1>
  </div>
  <nav className="mt-8">
    {navItems.map((item) => (
      <NavLink  
      
        key={item.name} 
        to={item.href} 
        className={`block py-5 px-6 text-gray-700 text-2xl mr-5 rounded-r-full hover:bg-blue-100 active:bg-blue-200 ${item.isActive ? 'bg-blue-300' : ''}`}
      >
        <i className={`${item.icon} mr-2 bg-slate-400 p-1 rounded-lg`}></i>
        {item.name}
      </NavLink>
    ))}
  </nav>
</aside>

<div className="flex-1 p-6 absolute top-0 right-0 w-[85%] bg-gray-50">
  <header className="flex justify-between items-center">
    <h2 className="text-2xl font-semibold">Welcome Admin</h2>
    <div className="flex items-center space-x-4">
      <p>Sun, 29 Nov 2019</p>
      <div className="relative">
        <img 
          src="https://via.placeholder.com/40" 
          alt="User" 
          className="rounded-full cursor-pointer" 
          onClick={() => setShowMenu(!showMenu)} 
        />
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
            <ul className="py-1">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li onClick={() => dispatch(logout())} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  </header>


<AdminDashboard/>

</div>
</div>
)
}

export default Admin
