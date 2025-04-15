import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import CustomerManagement from "../Admin/CustomerManager/CustomerManager";
import OrderManager from "../Admin/OrderManager/OrderManager";
import ProductManager from "../Admin/ProductManager/ProductManager";
import Category from "../Admin/ProductManager/Category/Category";
import Create from "../Admin/ProductManager/CreateProduct/Create";
import ViewProduct from "../Admin/ProductManager/View/ViewProduct";
import EditProduct from "../Admin/ProductManager/EditProduct/EditProduct";
import { UserContext } from "../context/UserContext";
import AccessDenied from "./AccessDenied";
import OrderManagement from "../Admin/OrderManagement/OrderManagement";

const HomeAdmin = lazy(() => import("../Admin/HomeAdmin/HomeAdmin"));

function AdminRoutes() {
  const user = useContext(UserContext);
  const role = user?.user?.role_id;

  console.log("🚀 ~ AdminRoutes ~ user:", user.user.role_id);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}> </Suspense>
      <Routes>
        <Route path="/homeAdmin" element={<HomeAdmin />} />

        {/* Role 1: SuperAdmin */}
        <Route
          path="/homeAdmin/superAdmin"
          element={role === 1 ? <HomeAdmin /> : <AccessDenied />}
        />

        {/* Role 2: ProductManager */}
        <Route
          path="/homeAdmin/productManager"
          element={role === 2 ? <ProductManager /> : <AccessDenied />}
        />
        <Route
          path="/homeAdmin/productManager/viewProduct/:productId"
          element={role === 2 ? <ViewProduct /> : <AccessDenied />}
        />
        <Route
          path="/homeAdmin/productManager/editProduct/:productId"
          element={role === 2 ? <EditProduct /> : <AccessDenied />}
        />
        <Route
          path="/homeAdmin/productManager/categoryProduct"
          element={role === 2 ? <Category /> : <AccessDenied />}
        />
        <Route
          path="/homeAdmin/productManager/create"
          element={role === 2 ? <Create /> : <AccessDenied />}
        />

        {/* Role 3: OrderManager */}
        <Route
          path="/homeAdmin/orderManager"
          element={role === 3 ? <OrderManager /> : <AccessDenied />}
        />
        {/* Role 4: CustomerManager */}
        <Route
          path="/homeAdmin/customerManager"
          element={role === 4 ? <CustomerManagement /> : <AccessDenied />}
        />

        {/* <Route
          path="/homeAdmin/customerManager"
          element={role === 4 ? <OrderManagement /> : <AccessDenied />}
        /> */}
        <Route path="*" element={<Navigate to="/homeAdmin" />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
