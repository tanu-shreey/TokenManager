import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdEye } from 'react-icons/io';
import "bootstrap/dist/css/bootstrap.min.css";


const Login = ({ setUser }) => {
  console.log('setUser:', setUser); // Debug log

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('http://13.50.172.202:3001/v0/login', { email, password });
      console.log('API Response:', response.data); // Log the entire response for debugging
      
      if (response.data && response.data.status === true) {
        const accessToken = response.data.data?.user?.accessToken;
        const user = response.data.data?.user;

        if (accessToken && user) {
          localStorage.setItem('token', accessToken); // Store token
          localStorage.setItem('user', JSON.stringify(user)); // Store user data

          setUser(user); // Set user state
          toast.success("Login successful!");
          resetForm(); // Reset form
          navigate('/AminPanel'); // Navigate to admin panel
        } else {
          setError('Login successful but missing user data or token.');
          console.error('Missing token or user data:', response.data);
        }
      } else {
        setError('Invalid login credentials.');
        console.error('Invalid credentials or server issue:', response.data);
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Login failed. Please check your credentials or try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Reset the form after successful login
  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm" style={{ width: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>
          {error && <p className="text-danger text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text" // Email validation removed
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  className="btn btn-outline-secondary"
                  type="button" 
                  onClick={togglePasswordVisibility}
                >
                  <IoMdEye />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
