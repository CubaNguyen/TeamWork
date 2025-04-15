import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProductManager from "../Admin/ProductManager/ProductManager";
import Create from "../Admin/ProductManager/CreateProduct/Create";
import ViewProduct from "../Admin/ProductManager/View/ViewProduct";
import EditProduct from "../Admin/ProductManager/EditProduct/EditProduct";
import Category from "../Admin/ProductManager/Category/Category";


const HomeAdmin = lazy(() => import("../Admin/HomeAdmin/HomeAdmin"));



function AdminRoutes() {
    // Hàm kiểm tra nếu chưa đăng nhập thì không vào được admin
    const isAdmin = true; // Thay bằng logic kiểm tra đăng nhập
    if (!isAdmin) return <Navigate to="/" />; // Nếu không phải admin, chuyển hướng về trang chủ
    
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}> 
            <Routes>


                <Route path="/homeAdmin" element={<HomeAdmin />} />
                <Route path="/homeAdmin/superAdmin" element={<HomeAdmin />} />
            
                <Route path="/homeAdmin/productManager" element={<ProductManager />} />
                <Route path="/homeAdmin/productManager/create" element={<Create />} />
                <Route path="/homeAdmin/productManager/viewProduct/:id" element={<ViewProduct />} />
                <Route path="/homeAdmin/productManager/editProduct/:id" element={<EditProduct />} />
                <Route path="/homeAdmin/productManager/categoryProduct" element={<Category />} />


                <Route path="/homeAdmin/orderManager" element={<HomeAdmin />} />
                <Route path="/homeAdmin/customerManager" element={<HomeAdmin />} />
                <Route path="*" element={<Navigate to="/homeAdmin" />} />

            </Routes>
            </Suspense>
        </>

    );
}

export default AdminRoutes;
