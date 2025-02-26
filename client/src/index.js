import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Gift from './components/Gift/gift';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Gift/>
    <App />
  </React.StrictMode>
);


