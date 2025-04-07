import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import About from './components/About/Abouts';
import CustomerManagement from './components/CustomerManagement/CustomerManagement';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <CustomerManagement/>
  </React.StrictMode>
);


