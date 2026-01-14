import {createBrowserRouter} from "react-router-dom"
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { AuthLayout } from "../layouts/AuthLayout";
import { AppLayout } from "../layouts/AppLayout";
const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
  {
    element: (
      // <ProtectedRoute>
        <AppLayout />
      // </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Home /> },
      // { path: "/dashboard", element: <Dashboard /> },
    ],
  },
  // {
  //   path: "/admin",
  //   element: (
  //     <AdminRoute>
  //       <AdminLayout />
  //     </AdminRoute>
  //   ),
  //   children: [{ index: true, element: <AdminDashboard /> }],
  // },
]);

export default router;
