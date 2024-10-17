import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState('');
  const [contact, setcontact] = useState('');
  const [salary, setsalary] = useState('');

  const initialFormData = {
    name,
    email,
    password,
    role,
    contact,
    salary,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Additional form submission logic can be added here
  };

  return (
    <div className="h-4/6 w-full flex justify-center p-8 items-center">
      <form onSubmit={handleSubmit} className="p-8 w-full rounded shadow-lg shadow-gray-500">
        <h2 className="text-2xl mb-4 text-center">{isRegistering ? 'Registration Form' : 'Login Form'}</h2>
        {isRegistering && Object.entries(initialFormData).map(([key, value]) => (
          <div className="" key={key}>
            <label className="block mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type={key === 'password' ? 'password' : 'text'}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="border p-2 w-full bg-[#A4A1A8]"
              required={key !== 'contact' && key !== 'salary'}
            />
          </div>
        ))}
        {!isRegistering && (
          <>
            <div className="">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 w-full bg-[#A4A1A8]"
                required
              />
            </div>
            <div className="">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border p-2 w-full bg-[#A4A1A8]"
                required
              />
            </div>
          </>
        )}
        <NavLink to={isRegistering ? '/signin' : '/login'} className="bg-blue-500 mt-4 text-white p-2 rounded">
          {isRegistering ? 'Register' : 'Login'}
        </NavLink>
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
}

export default Login;
