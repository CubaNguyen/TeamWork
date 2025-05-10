import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import OrderManagement from "./Admin/OrderManagement/OrderManagement";
import OrderHistory from "./Admin/OrderManagement/OrderHistory";

function App() {
  return (
    <div>
      

      <Routes>
        <Route path="/order-management" element={<OrderManagement />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
    </div>
  );
}

export default App;
