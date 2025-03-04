import { Routes, Route } from "react-router-dom";
import NotFound from '../pages/NotFound';


import { lazy, Suspense } from "react";
import Global from "../pages/Global/Global";
import Accessories from "../pages/Accessories/Accessories";
import AllProducts from "../pages/AllProducts/AllProducts";
import About from "../pages/About/Abouts";
import OurCollection from "../pages/OurCollection/OurCollection";
import Contact from "../pages/Contact/Contact";
import Gift from "../pages/Gift/gift";

const Home = lazy(() => import("../pages/Home/Home"));
const Products = lazy(() => import("../pages/Products"));
const Cart = lazy(() => import("../pages/Cart"));

const CustomerRoutes = () => {
    return (
        <>

            <Suspense fallback={<div>Loading...</div>}> </Suspense>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/global" element={<Global />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/holidayGift" element={< Gift />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/collections/accessories" element={<Accessories />} />
                <Route path="/ourCollections/" element={<OurCollection />} />
                <Route path="/allproduct" element={<AllProducts />} />


                <Route path="*" element={<NotFound />} />




            </Routes>
        </>



    );
}

export default CustomerRoutes;
