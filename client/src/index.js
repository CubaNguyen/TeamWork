import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import About from './components/About/Abouts';
import OurCollection from './components/OurCollection/OurCollection';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <OurCollection/>
  </React.StrictMode>
);


