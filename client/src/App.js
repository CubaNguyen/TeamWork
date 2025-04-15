import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import OrderManagement from "./Admin/OrderManagement/OrderManagement";
import OrderHistory from "./Admin/OrderManagement/OrderHistory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/order-management" />} />
      <Route path="/order-management" element={<OrderManagement />} />
      <Route path="/order-history" element={<OrderHistory />} />
    </Routes>
  );
}

export default App;
