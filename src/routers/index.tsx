import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import Home from '../pages/admin/admin-home/Home';
import RegisterAccount from '../pages/admin/register/RegisterAccount';
import UserProfile from '../pages/user-profile/UserProfile';
import AccountManagement from '../pages/admin/account-management/AccountManagement';
import Dashboard from '../pages/brand-manager/dashboard/Dashboard';
import { useAppSelector } from '../services/store/store';
import PageNotFoundPrevious from '../pages/page-not-found/PageNotFoundPrevious';
import PageNotFoundLogin from '../pages/page-not-found/PageNotFoundLogin';
import EmployeeManagement from '../pages/store-manager/employee-management/EmployeeManagement';
import CategoryManagement from '../pages/brand-manager/category-management/CategoryManagement';
import IngredientType from '../pages/brand-manager/ingredient/IngredientType';

const AppRouter = () => {
    const token = sessionStorage.getItem('quickServeToken');
    const { account } = useAppSelector((state) => state.account);

    const isAdmin = account?.roles.includes('Admin');
    const isStoreManager = account?.roles.includes('Store_Manager');
    const isBrandManager = account?.roles.includes('Brand_Manager');

    return (
        <Routes>
            {token === null || account === null ? (
                <>
                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<PageNotFoundLogin />} />
                </>
            ) : (
                <>
                    <Route path="/user-profile" element={<UserProfile />} />

                    {/* Admin */}
                    {isAdmin && (
                        <>
                            <Route path="/admin-home" element={<Home />} />
                            <Route
                                path="/account-management"
                                element={<AccountManagement />}
                            />
                            <Route
                                path="/admin-register"
                                element={<RegisterAccount />}
                            />
                        </>
                    )}

                    {/* Store Manager */}
                    {isStoreManager && (
                        <>
                            <Route
                                path="/employee-management"
                                element={<EmployeeManagement />}
                            />
                        </>
                    )}

                    {/* Brand Manager  */}
                    {isBrandManager && (
                        <>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/brand-category" element={<CategoryManagement />} />
                            <Route path="/ingredients/list-ingredients-type" element={<IngredientType />} />
                        </>
                    )}
                    {/* Page Not Found */}
                    <Route path="*" element={<PageNotFoundPrevious />} />
                </>
            )}
        </Routes>
    );
};

export default AppRouter;
