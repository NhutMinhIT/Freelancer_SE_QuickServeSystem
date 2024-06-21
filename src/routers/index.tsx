import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "../pages/admin/admin-home/Home";
import RegisterAccount from "../pages/admin/register/RegisterAccount";
import UserProfile from "../pages/user-profile/UserProfile";
import AccountManagement from "../pages/admin/account-management/AccountManagement";
import StoreManagement from "../pages/admin/store-management/StoreManagement";
import Dashboard from "../pages/brand-manager/dashboard/Dashboard";
import { useAppSelector } from "../services/store/store";
import PageNotFoundPrevious from "../pages/page-not-found/PageNotFoundPrevious";
import EmployeeManagement from "../pages/store-manager/employee-management/EmployeeManagement";
import CategoryManagement from "../pages/brand-manager/category-management/CategoryManagement";
import IngredientType from "../pages/brand-manager/ingredient/IngredientType";
import IngredientList from "../pages/brand-manager/ingredient/IngredientList";
import ProductTemplate from "../pages/brand-manager/product-template/ProductTemplate";
import TemplateStep from "../pages/brand-manager/tempate-steps/TemplateStep";

const AppRouter = () => {
  const token = sessionStorage.getItem("quickServeToken");
  const { account } = useAppSelector((state) => state.account);

  const isAdmin = account?.roles === "Admin";
  const isStoreManager = account?.roles === "Store_Manager";
  const isBrandManager = account?.roles === "Brand_Manager";

  return (
    <Routes>
      {token === null || account === null ? (
        <>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
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
              <Route path="/store-management" element={<StoreManagement />} />
              <Route path="/admin-register" element={<RegisterAccount />} />
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
              <Route
                path="/ingredients/list-ingredients"
                element={<IngredientList />}
              />
              <Route
                path="/ingredients/list-ingredients-type"
                element={<IngredientType />}
              />{" "}
              <Route
                path="/ingredients/list-ingredients-type"
                element={<IngredientType />}
              />
              <Route path="/product-template" element={<ProductTemplate />} />
              <Route
                path="/product-template-step/:id"
                element={<TemplateStep />}
              />
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
