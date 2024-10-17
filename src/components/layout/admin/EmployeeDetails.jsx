import React, { useState, useRef } from 'react';

function EmployeeDetails({ employee = {} }) {
    
  const [visibleSections, setVisibleSections] = useState({
    performance: false,
    documents: false,
    attendance: false,
    leaveRecords: false,
    goals: false,
    benefits: false, // Added benefits section visibility
  });

  const fileInputRef = useRef(null); // Reference for the file input

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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
      title: 'Performance History',
      data: employee.performanceHistory ? employee.performanceHistory.map(review => ({
        date: new Date(review.date).toLocaleDateString(),
        review: review.review,
      })) : [
        {
          date: '01/01/2023',
          review: 'Excellent performance in Q1.',
        },
        {
          date: '04/01/2023',
          review: 'Met all project deadlines.',
        },
      ],
      headers: ['Date', 'Review'],
      section: 'performance',
    },
    {
      title: 'Documents',
      data: employee.documents ? employee.documents.map(doc => ({
        document: (
          <div className="flex justify-between items-center">
            <a href={doc.docUrl} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{doc.docName}</a>
            <div>
              <button className="ml-4 text-blue-500 hover:underline">Edit</button>
              <button className="ml-2 text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ),
      })) : [
        {
          document: (
            <div className="flex justify-between items-center">
              <a href="#" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Sample Document 1</a>
              <div>
                <button className="ml-4 text-blue-500 hover:underline">Edit</button>
                <button className="ml-2 text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ),
        },
        {
          document: (
            <div className="flex justify-between items-center">
              <a href="#" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Sample Document 2</a>
              <div>
                <button className="ml-4 text-blue-500 hover:underline">Edit</button>
                <button className="ml-2 text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ),
        },
      ],
      headers: ['Document'],
      section: 'documents',
    },
    {
      title: 'Attendance',
      data: employee.attendance ? employee.attendance.map(record => ({
        date: new Date(record.date).toLocaleDateString(),
        checkIn: record.checkInTime,
        checkOut: record.checkOutTime,
        location: record.geofencedLocation,
      })) : [
        {
          date: '01/01/2023',
          checkIn: '9:00 AM',
          checkOut: '5:00 PM',
          location: 'Office',
        },
        {
          date: '01/02/2023',
          checkIn: '9:15 AM',
          checkOut: '5:10 PM',
          location: 'Office',
        },
      ],
      headers: ['Date', 'Check-In', 'Check-Out', 'Location'],
      section: 'attendance',
    },
    {
      title: 'Leave Records',
      data: employee.leaveRecords ? employee.leaveRecords.map(leave => ({
        leaveType: leave.leaveType,
        startDate: new Date(leave.startDate).toLocaleDateString(),
        endDate: new Date(leave.endDate).toLocaleDateString(),
        status: leave.status,
      })) : [
        {
          leaveType: 'Sick Leave',
          startDate: '01/10/2023',
          endDate: '01/12/2023',
          status: 'Approved',
        },
        {
          leaveType: 'Vacation',
          startDate: '02/01/2023',
          endDate: '02/05/2023',
          status: 'Pending',
        },
      ],
      headers: ['Leave Type', 'Start Date', 'End Date', 'Status'],
      section: 'leaveRecords',
    },
    {
      title: 'Goals',
      data: employee.goals ? employee.goals.map(goal => ({
        title: goal.title,
        description: goal.description,
        status: goal.status,
      })) : [
        {
          title: 'Complete Project A',
          description: 'Finish the development of Project A by the end of Q1.',
          status: 'In Progress',
        },
        {
          title: 'Improve Team Collaboration',
          description: 'Implement tools to enhance team communication.',
          status: 'Not Started',
        },
      ],
      headers: ['Title', 'Description', 'Status'],
      section: 'goals',
    },
    {
      title: 'Benefits',
      data: [
        {
          healthInsurance: employee.healthInsurance ? 'Yes' : 'No',
          retirementPlan: employee.retirementPlan ? 'Yes' : 'No',
          enrollmentDate: employee.enrollmentDate ? new Date(employee.enrollmentDate).toLocaleDateString() : 'N/A',
        }
      ],
      headers: ['Health Insurance', 'Retirement Plan', 'Enrollment Date'],
      section: 'benefits',
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
      {sections.map(({ title, data, headers, section }) => (
        <div className="w-full mb-6" key={section}>
          <div className="bg-white shadow-md rounded-lg p-4">
            <button
              onClick={() => toggleSection(section)}
              className="w-full text-left text-xl font-semibold text-gray-700"
            >
              {title}
            </button>
            {section === 'documents' && (
              <div className="mt-4 flex justify-between items-center">
                <input type="file" ref={fileInputRef} hidden className="mb-4" />
                <button 
                  onClick={() => fileInputRef.current.click()} 
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Upload Document
                </button>
              </div>
            )}
            {visibleSections[section] && (
              <div className="mt-4">
                {data.length === 0 ? (
                  <p>No {title.toLowerCase()} available.</p>
                ) : (
                  renderTable(data, headers)
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeDetails;
