import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login/register
import axiosInstance from '../../utils/axios'; // Import axios instance for making HTTP requests

const Login = ({ title }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee'); // Default role set to 'employee'
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and registration

  const navigate = useNavigate(); // To redirect after successful login or register

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'role' && (value === 'hr' || value === 'employee')) {
      setRole(value); // Update the role
    } else {
      if (name === 'name') setName(value);
      if (name === 'email') setEmail(value);
      if (name === 'password') setPassword(value);
    }
  };

  // Handle form submission for login or registration
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    const user = {
      name,
      email,
      password,
      role: role,
    }; // Create user object

    try {
      const endpoint = isRegistering ? '/auth/register' : '/auth/login'; // Determine endpoint based on action
      const response = await axiosInstance.post(endpoint, user); // POST request to login/register
      console.log(user);
      
      console.log(response.data); // Log response for debugging

      // Check if the request was successful

      if (response.data.success) {
        // Optionally, store the token or other data
        // Example: localStorage.setItem('token', response.data.token);

        // Navigate to the appropriate dashboard based on the user's role
        if (user.role === 'hr') {
          navigate('/admin-dashboard'); // Navigate to the admin dashboard for HR
        } else if (user.role === 'employee') {
          navigate('/employee-dashboard'); // Navigate to the employee dashboard
        }
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="h-4/6 w-full flex justify-center p-8 items-center bg-white">
      <form onSubmit={handleSubmit} className="p-8 w-full rounded shadow-lg shadow-gray-500">
        <h2 className="text-2xl mb-4 text-center capitalize">
          {isRegistering ? `Registration Form` : `Login Form`}
        </h2>

        {/* Name field (only show in registration mode) */}
        {isRegistering && (
          <div className="">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              className="border p-2 w-full bg-white"
              required
            />
          </div>
        )}

        {/* Email field */}
        <div className="">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="border p-2 w-full bg-white"
            required
          />
        </div>

        {/* Password field */}
        <div className="">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="border p-2 w-full bg-white"
            required
          />
        </div>

        {/* Role selection dropdown */}
        <div className="mt-4">
          <label className="block mb-2">Role</label>
          <select
            name="role"
            value={role}
            onChange={handleChange}
            className="border p-2 w-full bg-white"
            required
          >
            <option className=' capitalize' value="employee">Employee</option>
            <option className=' capitalize' value="hr">Hr</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 mt-4 text-white p-2 rounded w-full"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>

        {/* Toggle between login and register */}
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="mt-4 mx-4 text-blue-500"
        >
          {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
      </form>
    </div>
  );
};

export default Login;
