import { createContext, useState, useRef } from "react";
import { getRecommend } from "../services/aiService";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [imageFile, setImageFile] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const reqIdRef = useRef(0);
  const myId = ++reqIdRef.current;
  const recommendProductContext = async (imageFile) => {
    try {
      const res = await getRecommend(imageFile);
      if (myId !== reqIdRef.current) return null;
      console.log("🚀 ~ recommendProductContext ~ res:", res);
      const { predicted_class, confidence, recommended } = res.data || {};
      setRecommendedProducts(Array.isArray(recommended) ? recommended : []);
    } catch (error) {
      console.log("🚀 ~ recommendProductContext ~ error:", error);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        imageFile,
        setImageFile,
        recommendProductContext,
        recommendedProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
