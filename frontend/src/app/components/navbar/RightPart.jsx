import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { ProfileBtn } from '../auth/ProfileBtn';

export const LoginBtn = () => {
  const navigate = useNavigate();
  const { user, getProfile, loading } = useAuthStore();

  // Check authentication on mount
  useEffect(() => {
    getProfile();
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  // Loading state
  if (loading) {
    return <div className="skeleton h-12 w-12 rounded-full"></div>;
  }

  // If authenticated, show profile button
  if (user) {

    return <ProfileBtn />;
  }

  // If not authenticated, show login button
  return (
    <div>
      <button onClick={handleLogin} className='btn btn-primary btn-md'>
        Login
      </button>
    </div>
  );
};