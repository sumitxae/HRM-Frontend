import React, { useState } from 'react'
import EmployeeNavBar from '../../layout/Employe/EmployeeNavBar';
import Leave from '../../layout/Employe/Leave';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/authSlice';

const EmployeLeave = () => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    // Sample leave data
    const leaveData = [
        { id: 'LEAVE001', type: 'Sick Leave', status: 'Approved', date: '2023-10-01' },
        { id: 'LEAVE002', type: 'Vacation', status: 'Pending', date: '2023-10-15' },
        { id: 'LEAVE003', type: 'Casual Leave', status: 'Rejected', date: '2023-10-20' },
    ];

    return (
        <div className="flex">
            <EmployeeNavBar/>

            <div className="flex-1 p-6 absolute top-0 right-0 w-[85%] bg-gray-50">
                <header className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Welcome employee name</h2>
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

                <Leave/>

                {/* Leave Status Table */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Leave Status</h3>
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Leave ID</th>
                                <th className="py-3 px-6 text-left">Leave Type</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {leaveData.map(leave => (
                                <tr key={leave.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6">{leave.id}</td>
                                    <td className="py-3 px-6">{leave.type}</td>
                                    <td className="py-3 px-6">{leave.status}</td>
                                    <td className="py-3 px-6">{leave.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default EmployeLeave
