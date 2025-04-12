import { createContext, useEffect, useState } from "react";

// Khởi tạo Context
const ProductContext = createContext(null);

const ProductProvider = ({ children }) => {
  return (
    <ProductContext.Provider value={{}}>{children}</ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
