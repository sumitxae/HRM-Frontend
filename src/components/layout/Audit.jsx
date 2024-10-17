import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

const columns = [
  { id: 'dateTime', label: 'Date and Time', minWidth: 100 },
  { id: 'actionOwners', label: 'Action Owners', minWidth: 170 },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'employee',
    label: 'Employee',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  { id: 'section', label: 'Section', minWidth: 100 },
  { id: 'actionDescription', label: 'Action Description', minWidth: 200 },
];

const createData = (dateTime, actionOwners, action, employee, section, actionDescription) => {
  const density = action / employee;
  return { dateTime, actionOwners, action, employee, density, section, actionDescription };
};

const rows = [
  createData('2023-10-01 12:00', 'John Doe', 50, 10, 'HR', 'Approved leave request'),
  createData('2023-10-01 12:00', 'Jane Smith', 75, 15, 'Finance', 'Processed payroll'),
  createData('2023-10-01 12:00', 'Alice Johnson', 100, 20, 'IT', 'Updated software'),
  createData('2023-10-01 12:00', 'Bob Brown', 60, 12, 'Sales', 'Closed a deal'),
  createData('2023-10-01 12:00', 'Charlie Davis', 80, 16, 'Marketing', 'Launched campaign'),
  createData('2023-10-01 12:00', 'Eve White', 90, 18, 'HR', 'Conducted interview'),
  createData('2023-10-01 12:00', 'Frank Black', 70, 14, 'Finance', 'Reviewed budget'),
  createData('2023-10-01 12:00', 'Grace Green', 110, 22, 'IT', 'Fixed bugs'),
  createData('2023-10-01 12:00', 'Hank Blue', 40, 8, 'Sales', 'Followed up with client'),
  createData('2023-10-01 12:00', 'Ivy Yellow', 30, 6, 'Marketing', 'Analyzed metrics'),
  createData('2023-10-01 12:00', 'Jack Red', 20, 4, 'HR', 'Onboarded new employee'),
  createData('2023-10-01 12:00', 'Kathy Purple', 10, 2, 'Finance', 'Audited accounts'),
  createData('2023-10-01 12:00', 'Leo Orange', 120, 24, 'IT', 'Implemented new feature'),
  createData('2023-10-01 12:00', 'Mia Pink', 130, 26, 'Sales', 'Generated leads'),
  createData('2023-10-01 12:00', 'Nina Grey', 140, 28, 'Marketing', 'Created content'),
];

const Audit = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className='h-14 border-b-4 flex justify-between items-center p-4'>
        <div className='flex space-x-4'>
          <a href="/employee-list" className='text-blue-500'>Employee List</a>
          <a href="/my-info" className='text-blue-500'>My Info</a>
          <a href="/directory" className='text-blue-500'>Directory</a>
          <a href="/buzz" className='text-blue-500'>Buzz</a>
          <a href="/announcements" className='text-blue-500'>Announcements</a>
          <a href="/organization-chart" className='text-blue-500'>Organization Chart</a>
          <a href="/dashboard" className='text-blue-500'>Dashboard</a>
        </div>
      </div>
    
      <div className='p-8'>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.dateTime}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default Audit;
