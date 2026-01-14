import React, { useState } from 'react'
import { useAuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom'
import {toast} from "react-hot-toast"
export const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();
  
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
    // Clear validation error when user types
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};

    // Check if at least email or username is provided
    if (!form.email && !form.username) {
      errors.email = "Email or Username is required";
      errors.username = "Email or Username is required";
    }

    // Check password
    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const success = await login(form);

    if (success) {
      toast.success("Login Successfully")
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-xl">Login</legend>

          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input 
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email" 
            className={`input input-bordered w-full ${validationErrors.email ? 'input-error' : ''}`}
            placeholder="Email"
          />
          {validationErrors.email && (
            <label className="label">
              <span className="label-text-alt text-error">{validationErrors.email}</span>
            </label>
          )}

          <div className="divider">OR</div>

          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input 
            name="username"
            value={form.username}
            onChange={handleChange}
            type="text" 
            className={`input input-bordered w-full ${validationErrors.username ? 'input-error' : ''}`}
            placeholder="Username"
          />
          {validationErrors.username && (
            <label className="label">
              <span className="label-text-alt text-error">{validationErrors.username}</span>
            </label>
          )}

          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input 
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password" 
            className={`input input-bordered w-full ${validationErrors.password ? 'input-error' : ''}`}
            placeholder="Password"
          />
          {validationErrors.password && (
            <label className="label">
              <span className="label-text-alt text-error">{validationErrors.password}</span>
            </label>
          )}

          {error && (
            <p className="text-error text-sm mt-2">{error}</p>
          )}

          <button 
            type="submit"
            className="btn btn-primary mt-4 w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </fieldset>
      </form>
    </div>
  )
}