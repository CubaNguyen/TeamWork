import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.scss'
import Navbar from './components/Navbar/Navbar';
import { Suspense, lazy } from 'react';
import Footer from './components/Footer/Footer';

import HomeAdmin from './components/Admin/HomeAdmin/HomeAdmin';
import AdminRoutes from './routes/AdminRoutes';
import CustomerRoutes from './routes/CustomerRoutes';


const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Cart = lazy(() => import('./pages/Cart'));


function App() {

  return (
    <div className='container'>

      <Router>
        {!window.location.pathname.startsWith("/homeAdmin") && <div className="navbar"><Navbar /></div>}


        {window.location.pathname.startsWith("/homeAdmin") ? (
          <AdminRoutes />
        ) : (
          <>
            <CustomerRoutes />

          </>


        )}



      </Router>

      {!window.location.pathname.startsWith("/homeAdmin") && <Footer />}

    </div>

    // <div className='container'>
    //   <HomeAdmin />
    // </div>
  );
}

export default App;
