import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Outlet />
        </div>
    );
};


