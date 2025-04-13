import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OrderManagement from './components/OrderManagement/OrderManagement';
import CustomerDetail from './components/OrderManagement/CustomerDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrderManagement />} />
      <Route path="/customer/:id" element={<CustomerDetail />} />
    </Routes>
  );
}

export default App;
