import { Routes, Route } from "react-router-dom";
import NotFound from '../pages/NotFound';


import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const Cart = lazy(() => import("../pages/Cart"));

const CustomerRoutes = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}> </Suspense>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />




            </Routes>
        </>



    );
}

export default CustomerRoutes;
