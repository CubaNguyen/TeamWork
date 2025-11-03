import React, { useContext, useEffect, useState } from "react";
import AllProducts from "../AllProducts/AllProducts";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageFile } = useContext(SearchContext);

  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q") || "";

  const [inputValue, setInputValue] = useState(() => q); // chỉ set 1 lần từ URL
  const [searchTerm, setSearchTerm] = useState(q); // dùng để lọc

  // Khi searchTerm thay đổi => cập nhật URL
  useEffect(() => {
    const encoded = encodeURIComponent(searchTerm.trim());
    navigate(`/search?q=${encoded}`, { replace: true });
  }, [searchTerm]);
  return (
    <>
      <AllProducts
        isSearch={true}
        searchTerm={searchTerm}
        setInputValue={setInputValue}
        inputValue={inputValue}
        imageFile={imageFile}
        onSearch={() => setSearchTerm(inputValue)}
      />
    </>
  );
};

export default Search;
