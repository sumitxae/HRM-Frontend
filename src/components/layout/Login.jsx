import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../../store/authSlice';

const Login = ({ title }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'role' && (value === 'hr' || value === 'employee')) {
            setRole(value);
        } else {
            if (name === 'name') setName(value);
            if (name === 'email') setEmail(value);
            if (name === 'password') setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const user = {
            name,
            email,
            password,
            role,
        };

        try {
            const response = isRegistering
                ? await dispatch(registerUser(user))
                : await dispatch(loginUser({ email, password }));

            if (response.meta.requestStatus === 'fulfilled') {
                const { token } = response.payload;
                localStorage.setItem('token', token);

                if (response.payload.role === 'hr') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/employee-dashboard');
                }
            } else {
                setError(typeof response.payload === 'string' ? response.payload : 'An error occurred');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Failed to submit the form. Please check your credentials and try again.');
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
                    <div>
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
                {isRegistering && (
                    <div className="mt-4">
                        <label className="block mb-2">Role</label>
                        <select
                            name="role"
                            value={role}
                            onChange={handleChange}
                            className="border p-2 w-full bg-white"
                            required
                        >
                            <option className="capitalize" value="employee">Employee</option>
                            <option className="capitalize" value="hr">HR</option>
                        </select>
                    </div>
                )}

                {/* Display error message */}
                {error && typeof error === 'string' && <p className="text-red-500 mt-2">{error}</p>}

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
