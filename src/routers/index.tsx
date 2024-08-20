import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "../pages/admin/admin-home/Home";
import RegisterAccount from "../pages/admin/register/RegisterAccount";
import UserProfile from "../pages/user-profile/UserProfile";
import AccountManagement from "../pages/admin/account-management/AccountManagement";
import StoreManagement from "../pages/admin/store-management/StoreManagement";
import { useAppSelector } from "../services/store/store";
import PageNotFoundPrevious from "../pages/page-not-found/PageNotFoundPrevious";
import EmployeeManagement from "../pages/store-manager/employee-management/EmployeeManagement";
import CategoryManagement from "../pages/brand-manager/category-management/CategoryManagement";
import IngredientType from "../pages/brand-manager/ingredient/IngredientType";
import IngredientList from "../pages/brand-manager/ingredient/IngredientList";
import ProductTemplate from "../pages/brand-manager/product-template/ProductTemplate";
import TemplateStep from "../pages/brand-manager/tempate-steps/TemplateStep";
import SessionManagement from "../pages/store-manager/session-management/SessionManagement";
import Nutrition from "../pages/store-manager/Nutrition/Nutrition";
import Statistic from "../pages/store-manager/statistic/Statistic";
import StatictisOfBrand from "../pages/brand-manager/statictisBrandManagement/StatictisOfBrand";
import Payment from "../pages/brand-manager/payment/Payment";
import PaymentStore from "../pages/store-manager/payment/Payment";
import Order from "../pages/brand-manager/order/Order";
import OrderManagement from "../pages/store-manager/order-management/OrderManagement";
import AccountStatics from "../pages/admin/account-statics/AccountStatics";

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
              <Route path="/admin-revenue-report" element={<Home />} />
              <Route
                path="/account-management"
                element={<AccountManagement />}
              />
              <Route
                path="/account-statics"
                element={<AccountStatics />}
              />
              <Route path="/store-management" element={<StoreManagement />} />
              <Route path="/admin-register" element={<RegisterAccount />} />
            </>
          )}

          {/* Store Manager */}
          {isStoreManager && (
            <>
              <Route
                path="/dashboard"
                element={<Statistic />}
              />
              <Route
                path="/employee-management"
                element={<EmployeeManagement />}
              />
              <Route path="/time-management"
                element={<SessionManagement />}
              />
              <Route path="/list-payments"
                element={<PaymentStore />}
              />
              <Route path="/order-management"
                element={<OrderManagement />}
              />
            </>
          )}

          {/* Brand Manager  */}
          {isBrandManager && (
            <>
              <Route path="/dashboard" element={<StatictisOfBrand />} />
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
              <Route path="/list-nutritions"
                element={<Nutrition />}
              />
              <Route path="/list-payments-brand"
                element={<Payment />}
              />
              <Route path="/order-management-brand"
                element={<Order />}
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
