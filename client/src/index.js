import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD

import CustomerManagement from './components/CustomerManagement/CustomerManagement';
=======
import App from './App';
import { UserProvider } from './context/UserContext';
>>>>>>> 47ae8624d81ff0b37a5774a22041f0305da053a1

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    {/* <App /> */}
    <CustomerManagement/>
=======
    <UserProvider>
      <App />
    </UserProvider>

>>>>>>> 47ae8624d81ff0b37a5774a22041f0305da053a1
  </React.StrictMode>
);


