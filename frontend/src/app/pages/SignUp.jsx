import React, { useState } from 'react'
import { useAuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom'
import {toast} from "react-hot-toast"
export const SignUp = () => {
  const navigate = useNavigate();
  const { signupUser, loading, error } = useAuthStore();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await signupUser(form);

    if (success) {
      toast.success("Sign Up Successfully")
      navigate("/login");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-xl">Create Account</legend>

          <label className="label">Email</label>
          <input
            name="email"          
            value={form.email}    
            onChange={handleChange}
            type="email"
            className="input"
            placeholder="Email"
          />

          <label className="label">Username</label>
          <input
            name="username"         
            value={form.username}   
            onChange={handleChange}
            type="text"
            className="input"
            placeholder="Username"
          />

          <label className="label">Password</label>
          <input
            name="password"         
            value={form.password}   
            onChange={handleChange}
            type="password"
            className="input"
            placeholder="Password"
            minLength={6}
          />

          {error && <p className="text-error text-sm mb-2">{error}</p>}

          <button className="btn btn-primary mt-4">
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </fieldset>
      </form>
    </div>
  )
}