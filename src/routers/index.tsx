import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../pages/login/Login"
import Home from "../pages/admin/admin-home/Home"
import RegisterAccount from "../pages/admin/register/RegisterAccount"
import UserProfile from "../pages/user-profile/UserProfile"
import AccountManagement from "../pages/admin/account-management/AccountManagement"
import EmployeeManagement from "../pages/store-manager/EmployeeManagement/EmployeeManagement"
import Dashboard from "../pages/brand-manager/dashboard/Dashboard"
const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/user-profile" element={<UserProfile />} />

            {/* Admin */}
            <Route path="/admin-home" element={<Home />} />
            <Route path="/account-management" element={<AccountManagement />} />
            <Route path="/admin-register" element={<RegisterAccount />} />

            {/* Store Manager */}
            <Route path="/employee-management" element={<EmployeeManagement />} />

            {/* Brand Manager  */}
            <Route path="/dashboard" element={<Dashboard />} />

        </Routes >
    )
}

export default AppRouter
