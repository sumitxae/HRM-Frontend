import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeDetails } from '../../../store/employeeSlice';

function EmployeeDetails() {
  const { id } = useParams(); // Get the employee ID from the URL parameters
  const fileInputRef = useRef(null); // Reference for the file input

  const employee = useSelector((state) => state.employee.currentEmployee);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEmployeeDetails(id));

  }, [id]);


  if (!employee) return <div>Loading...</div>; // Show loading state while fetching data

  const renderTable = (data, headers) => (
    <table className="w-full text-left border border-gray-200">
      <thead>
        <tr className="bg-gray-50">
          {headers.map((header) => (
            <th key={header} className="py-2 px-4 border-b">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-gray-100">
            {Object.values(item).map((value, idx) => (
              <td key={idx} className="py-2 px-4 border-b">{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const sections = [
    {
      title: 'Documents',
      data: employee.documents.map((document, index) => index < 10 && ({
        name: document.docName.charAt(0).toUpperCase() + document.docName.slice(1),
        id: document._id,
        uploadAT: document.uploadedAt,
        docUrl: document.docUrl
    })) || [],
      headers: ['Document', 'Document Id', 'Uploaded At', 'Doc-Url'],
    },
    {
      title: 'Attendance',
      data: employee.attendanceRecords.map((record, index) => index < 10 && ({
        date: new Date(record.checkInTime).toLocaleDateString(),
        checkIn: new Date(record.checkInTime).toLocaleTimeString(),
        checkOut: new Date(record.checkOutTime).toLocaleTimeString(),
        Overtime: record.overtimeHours,
      })) || [],
      headers: ['Date', 'Check-In', 'Check-Out', 'OverTime'],
    },
    {
      title: 'Leave Records',
      data: employee.leaveRecords.map((record, index) => index < 10 && ({
        leaveType: record.leaveType.charAt(0).toUpperCase() + record.leaveType.slice(1),
        startDate: new Date(record.startDate).toLocaleDateString(),
        endDate: new Date(record.endDate).toLocaleDateString(),
        status: record.status.charAt(0).toUpperCase() + record.status.slice(1), 
      }) ) || [],
      headers: ['Leave Type', 'Start Date', 'End Date', 'Status'],
    },

  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Employee Basic Info Card */}
      <div className="w-full bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Employee Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p><strong>Name:</strong> {employee.user?.name || 'N/A'}</p>
            <p><strong>Email:</strong> {employee.user?.email || 'N/A'}</p>
            <p><strong>Phone:</strong> {employee.contactDetails?.phone || 'N/A'}</p>
            <p><strong>Address:</strong> {employee.contactDetails?.address || 'N/A'}</p>
          </div>
          <div>
            <p><strong>Department:</strong> {employee.department || 'N/A'}</p>
            <p><strong>Hourly Rate:</strong> ${employee.hourlyRate || 'N/A'}</p>
            <p><strong>Overtime Hours:</strong> {employee.overtimeHours || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Sections */}
      {sections.map(({ title, data, headers }, index) => (
        <div className="w-full mb-6" key={index}>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            {renderTable(data, headers)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeDetails;
