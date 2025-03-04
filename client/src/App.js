import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss'
import Navbar from './components/Navbar/Navbar';
// import { Suspense, lazy } from 'react';
import Footer from './components/Footer/Footer';


import AdminRoutes from './routes/AdminRoutes';
import CustomerRoutes from './routes/CustomerRoutes';
import NavAdmin from './Admin/NavAdmin/NavAdmin';




function App() {

  return (
    <div className='container'>

      <Router>
        <div className="navbar">
          {window.location.pathname.startsWith("/homeAdmin") ? <NavAdmin /> : <Navbar />}
        </div>


        <div className='content'>
          {window.location.pathname.startsWith("/homeAdmin") ? (
            <AdminRoutes />
          ) : (
            <>
              <CustomerRoutes />

            </>
          )}
        </div>

      </Router>

      {!window.location.pathname.startsWith("/homeAdmin") && <Footer />}

    </div>

    // <div className='container'>
    //   <HomeAdmin />
    // </div>
  );
}

export default App;
