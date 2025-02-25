import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss'
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar/Navbar';
import { Suspense, lazy } from 'react';
import Footer from './components/Footer/Footer';
import AllProducts from './components/AllProducts/AllProducts';
import MiniNavBar from './components/Navbar/MiniNavBar';
import MainContent from './components/content/MainContent';
import Order from './components/Order/Order';


const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Cart = lazy(() => import('./pages/Cart'));


function App() {
  return (
    <div className='container'>
      <Router>
        <Navbar />
        {/* <AllProducts /> */}
        {/* <MainContent /> */}
        <Order />

        <Suspense fallback={<div>Loading...</div>}></Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
