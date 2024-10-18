import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AdminNavBar from '../../layout/admin/AdminNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/authSlice';

const AdminAttendance = () => {
    const [showMenu, setShowMenu] = useState(false);
    
    
    const dispatch = useDispatch();
    
    
    const employees = useSelector(state => state.employee.employees);

    const today = new Date().toISOString().split('T')[0];

    const unSortedAttendance = employees.map(employee => {
        
        const todayAttendance = employee.attendanceRecords.find(record => {
            const checkInTime = new Date(record.checkInTime); 
            return checkInTime.toISOString().split('T')[0] === today; 
        });

        
        const hasAttendanceToday = !!todayAttendance;

        return {
            id: employee._id, 
            name: employee.user.name,
            hasAttendanceToday: hasAttendanceToday,
            checkInTime: hasAttendanceToday ? todayAttendance.checkInTime : null,
            checkOutTime: hasAttendanceToday ? todayAttendance.checkOutTime : null,
            overtimeHours: hasAttendanceToday ? todayAttendance.overtimeHours : 0,
        };
    });

    const attendance = unSortedAttendance.sort((a, b) => {
        return b.hasAttendanceToday - a.hasAttendanceToday;
    });


    const handleAttendanceChange = (employee) => {
        setAttendance(prev => ({ ...prev, [employee]: !prev[employee] }));
    };

    return (
        <div className="flex">
            <AdminNavBar />

            <div className="flex-1 p-6 absolute top-0 right-0 w-[85%] bg-gray-50">
                <header className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Welcome Admin</h2>
                    <div className="flex items-center space-x-4">
                        <p>{new Date().toLocaleDateString()}</p>
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

                <div className='w-full h-20 flex items-center justify-between px-5 rounded-2xl mt-4 shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.3),0_4px_10px_rgba(0,0,0,0.3)]'>
                    <h1 className='text-lg'><i className="ri-home-line"></i> home / Dashboard</h1>
                    <h1>Admin Dashboard</h1>
                </div>

                <div className="container mx-auto mt-8">
                    <h1 className="text-3xl font-bold mb-6">Employee Attendance Records</h1>
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-4 text-left text-sm font-bold text-gray-600">Employee Name</th>
                                    <th className="p-4 text-left text-sm font-bold text-gray-600">Check-In Time</th>
                                    <th className="p-4 text-left text-sm font-bold text-gray-600">Check-Out Time</th>
                                    <th className="p-4 text-left text-sm font-bold text-gray-600">Overtime Hours</th>
                                    <th className="p-4 text-left text-sm font-bold text-gray-600">Leave Records</th>
                                    <th className="p-4 text-left text-sm font-bold text-gray-600">Created At</th>
                                    <th className="p-4 text-left text-sm font-bold text-gray-600">Attendance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {attendance.map((record, index) => index < 7 && (
                                    <tr key={index}>
                                        <td className="p-4 text-gray-800">{record.name}</td>
                                        <td className="p-4 text-gray-800">{record.checkInTime}</td>
                                        <td className="p-4 text-gray-800">{record.checkOutTime}</td>
                                        <td className="p-4 text-gray-800">{record.overtimeHours}</td>
                                        <td className="p-4 text-blue-500 hover:underline"><Link to={`/admin-employee-profile/${record.id}`}  >View Leave Records</Link></td>
                                        <td className="p-4 text-gray-600">-</td>
                                        <td className="p-4">
                                            <span className={record.hasAttendanceToday ? "text-white bg-green-400 p-1 rounded-md" : "text-white bg-red-400 p-1 rounded-md"}>
                                                {record.hasAttendanceToday ? "Present" : "Absent"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminAttendance;