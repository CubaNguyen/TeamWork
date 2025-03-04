import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";


const HomeAdmin = lazy(() => import("../Admin/HomeAdmin/HomeAdmin"));



function AdminRoutes() {
    // Hàm kiểm tra nếu chưa đăng nhập thì không vào được admin
    const isAdmin = true; // Thay bằng logic kiểm tra đăng nhập
    if (!isAdmin) return <Navigate to="/" />; // Nếu không phải admin, chuyển hướng về trang chủ

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}> </Suspense>
            <Routes>


                <Route path="/homeAdmin" element={<HomeAdmin />} />
                <Route path="/homeAdmin/superAdmin" element={<HomeAdmin />} />
                <Route path="/homeAdmin/productManager" element={<HomeAdmin />} />
                <Route path="/homeAdmin/orderManager" element={<HomeAdmin />} />
                <Route path="/homeAdmin/customerManager" element={<HomeAdmin />} />
                <Route path="*" element={<Navigate to="/homeAdmin" />} />
            </Routes>
        </>

    );
}

export default AdminRoutes;
