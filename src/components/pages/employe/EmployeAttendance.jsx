import React, { useState } from 'react';
import EmployeeNavBar from '../../layout/Employe/EmployeeNavBar';
import AttendEmploye from '../../layout/Employe/AttendEmploye';

const EmployeAttendance = () => {
    const [showMenu, setShowMenu] = useState(false);
    const employee = { id: 'EMP001', name: 'John Doe' }; // Single employee

    return (
        <div className="flex">
            <EmployeeNavBar />
            <div className="flex-1 p-6 absolute top-0 right-0 w-[85%] bg-gray-50">
                <header className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Welcome {employee.name}</h2>
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
                                        {['Profile', 'Settings', 'Logout'].map((item) => (
                                            <li key={item} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </header>


                {/* Attendance Records Table */}
                <AttendEmploye/>
                
            </div>
        </div>
    );
}

export default EmployeAttendance;
