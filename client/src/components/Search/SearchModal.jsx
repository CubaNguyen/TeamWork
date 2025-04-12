import "./SearchModal.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const SearchModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="searchModalComponent">
      <div className="overlay" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            placeholder="Gõ để tìm kiếm"
            className="search-input"
          />
          <div style={{ fontSize: "30px" }}>
            <FaArrowRightLong />
          </div>

          <div className="close" onClick={closeModal}>
            <RxCross2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
