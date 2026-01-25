import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { LogOut, User } from 'lucide-react';

export const ProfileBtn = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-circle btn-primary avatar placeholder"
            >
                <div className="w-10 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                </div>
            </div>

            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-99 w-52 p-2 shadow-lg border border-base-300 mt-3"
            >
                {/* User Info */}
                <li className="menu-title px-4 py-2">
                    <div>
                        <p className="font-bold text-base">{user?.username}</p>
                        <p className="text-xs text-base-content/60">{user?.email}</p>
                    </div>
                </li>

                <div className="divider my-0"></div>

                {/* Profile Link */}
                {/* <li>
                    <a onClick={() => navigate('/profile')}>
                        <User className="w-4 h-4" />
                        Profile
                    </a>
                </li> */}

                {/* Logout */}
                <li>
                    <a onClick={handleLogout} className="text-error">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
};