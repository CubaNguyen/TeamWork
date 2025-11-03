import { useEffect, useState } from "react";
import "./SearchModal.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineImageSearch } from "react-icons/md";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const SearchModal = ({ isOpen, closeModal }) => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const [file, setFile] = useState(null);
  const { setImageFile } = useContext(SearchContext);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    console.log("Ảnh đã chọn:", e.target.files[0]);
    const chosenFile = e.target.files[0];
    if (chosenFile) {
      setImageFile(chosenFile);
      setFile(chosenFile);
      console.log("Ảnh đã chọn:", chosenFile);

      // 👉 redirect luôn sang search by image
      closeModal();
      navigate("/search?q=byImage");
    }
  };

  useEffect(() => {
    if (isOpen) {
      setQuery(""); // reset input khi mở modal
      setFile(null); // reset file khi mở modal
    }
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    // <div className="searchModalComponent">
    //   <div className="overlay" onClick={closeModal}>
    //     <div className="modal" onClick={(e) => e.stopPropagation()}>
    //       <input
    //         type="text"
    //         placeholder="Gõ để tìm kiếm"
    //         className="search-input"
    //         onChange={(e) => setQuery(e.target.value)}
    //         // autoComplete="off"
    //         name=""
    //       />

    //       {/* ------------------------------------*/}
    //       <input
    //         id="upload-image"
    //         type="file"
    //         accept="image/*"
    //         style={{ display: "none" }}
    //         onChange={handleFileChange}
    //       />

    //       {/* ------------------------------------- */}

    //       <NavLink
    //         style={{
    //           textDecoration: "none",
    //           fontSize: "30px",
    //           // cursor: "pointer",
    //           color: "white",
    //           cursor: query.trim() ? "pointer" : "not-allowed",
    //         }}
    //         exact
    //         onClick={(e) => {
    //           if (!query.trim()) {
    //             e.preventDefault(); // Chặn chuyển trang nếu trống
    //           } else {
    //             closeModal();
    //           }
    //         }}
    //         to={`/search?q=${encodeURIComponent(query)}`}
    //         // to={`/homeAdmin/productMacustomerManagernager/detail/${customer.id}`}
    //       >
    //         {/* <MdOutlineImageSearch
    //             style={{
    //               paddingRight: "10px",
    //               cursor: "pointer",
    //             }}
    //           /> */}

    //         {/* icon click để mở chọn file */}
    //         <label htmlFor="upload-image">
    //           <MdOutlineImageSearch
    //             style={{
    //               paddingRight: "10px",
    //               cursor: "pointer",
    //               fontSize: "24px",
    //             }}
    //           />
    //         </label>

    //         {file && <p>Ảnh đã chọn: {file.name}</p>}

    //         <FaArrowRightLong />
    //       </NavLink>

    //       <div
    //         className="close"
    //         style={{ cursor: "pointer" }}
    //         onClick={closeModal}
    //       >
    //         <RxCross2 />
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="searchModalComponent">
      <div className="overlay" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            placeholder="Gõ để tìm kiếm"
            className="search-input"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />

          {/* input file ẩn */}
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <NavLink
            style={{
              textDecoration: "none",
              fontSize: "30px",
              color: "white",
              cursor: query.trim() ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            exact
            onClick={(e) => {
              if (!query.trim() && !file) {
                e.preventDefault();
              } else {
                closeModal();
              }
            }}
            to={`/search?q=${encodeURIComponent(query)}`}
          >
            {/* icon image search */}
            <MdOutlineImageSearch
              style={{ cursor: "pointer", fontSize: "24px" }}
              onClick={(e) => {
                e.preventDefault(); // ngăn NavLink điều hướng khi click icon
                document.getElementById("upload-image").click();
              }}
            />

            {/* icon arrow */}
            <FaArrowRightLong />
          </NavLink>

          {file && <p>Ảnh đã chọn: {file.name}</p>}

          <div
            className="close"
            style={{ cursor: "pointer" }}
            onClick={closeModal}
          >
            <RxCross2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
