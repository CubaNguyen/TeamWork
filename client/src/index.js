import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import About from './components/About/Abouts';
import OurCollection from './components/OurCollection/OurCollection';
import CustomerManager from './components/CustomerManager/CustomerManager';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <CustomerManager/>
  </React.StrictMode>
);


