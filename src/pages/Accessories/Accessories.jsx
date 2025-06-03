import React, { useState } from 'react';
import "./Accessories.scss"
import PriceRange from './PriceRange';

const Accessories = () => {

    const products = [
        {
            id: 1,
            name: "Kính HELIOS AEOS",
            price: "1.250.000 VND",
            rating: 0,
            image: "https://helios.vn/cdn/shop/products/kinh-helios-aeos.jpg",
            link: "https://helios.vn/collections/accessories/products/kinh-helios-aeos",
        },
        {
            id: 2,
            name: "Kính RHODES HELIOS",
            price: "1.250.000 VND",
            rating: 0,
            image: "https://helios.vn/cdn/shop/products/kinh-rhodes-helios.jpg",
        },
        {
            id: 3,
            name: "Kính HELIOS DUNCAN",
            price: "1.250.000 VND",
            rating: 0,
            image: "https://helios.vn/cdn/shop/products/kinh-helios-duncan.jpg",
            soldOut: true,
        },
    ];

    const [expanded, setExpanded] = useState({});

    const toggleExpand = (category) => {
        setExpanded((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        const newCheckedState = e.target.checked; // Lấy trạng thái mới
        setIsChecked(newCheckedState);

        if (newCheckedState) {
            alert("Bạn đã chọn!");
        }
    };
    return (
        <div className='accessoriesContainer'>
            <div className='accessoriesHeader'>
                ACCESSORIES
            </div>
            <div>
                <div className="productListContainer">
                    <div className="filters">

                        <PriceRange />
                        <hr width="100%" />
                        <div
                            className="categoryChoice"
                            onClick={() => toggleExpand("size")}
                        >
                            <div className='text'>Size</div>

                            <span>{expanded["size"] ? '-' : '+'}</span>
                        </div>
                        {expanded["size"] ?
                            <div className='checkboxChoice'>
                                <div className='checkboxChoiceContent'>
                                    <input type="checkbox"
                                        checked={isChecked}
                                        className='custom-checkbox'
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className='text'>Mặc định </div>
                                </div>
                                <div className='checkboxChoiceContent'>
                                    <input type="checkbox"
                                        checked={isChecked}
                                        className='custom-checkbox'
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className='text'>Size mặt đồng hồ 38mm</div>
                                </div>
                                <div className='checkboxChoiceContent'>
                                    <input type="checkbox"
                                        checked={isChecked}
                                        className='custom-checkbox'
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className='text'>Size mặt đồng hồ 40mm</div>
                                </div>
                                <div className='checkboxChoiceContent'>
                                    <input type="checkbox"
                                        checked={isChecked}
                                        className='custom-checkbox'
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className='text'>Size mặt đồng hồ 42mm</div>
                                </div>
                                <div className='checkboxChoiceContent'>
                                    <input type="checkbox"
                                        checked={isChecked}
                                        className='custom-checkbox'
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className='text'>Size mặt đồng hồ 44mm</div>
                                </div>

                            </div>

                            : ""}

                        <hr width="100%" />
                        <div
                            className="categoryChoice"
                            onClick={() => toggleExpand("sale")}
                        >
                            <div className='text'>Sale</div>

                            <span>{expanded["sale"] ? '-' : '+'}</span>

                        </div>
                        {expanded["sale"] ?
                            <div className='checkboxChoice'>
                                <div className='checkboxChoiceContent'>
                                    <input type="checkbox"
                                        checked={isChecked}
                                        className='custom-checkbox'
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className='text'>Sale</div>
                                </div>
                            </div>
                            : ""}

                        <hr width="100%" />


                        <div
                            className="categoryChoice"
                            onClick={() => toggleExpand("sortBy")}
                        >
                            <div className='text'>Lọc bằng</div>

                            <span>{expanded["sortBy"] ? '-' : '+'}</span>
                        </div>
                        {expanded["sortBy"] ?
                            <div className='checkboxChoice'>
                                <div className='checkboxChoiceContent'>
                                    <input type="checkbox"
                                        checked={isChecked}
                                        className='custom-checkbox'
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className='text'>Nổi bật </div>
                                </div>
                                <div className='checkboxChoiceContent'>
                                    <input type="checkbox"
                                        checked={isChecked}
                                        className='custom-checkbox'
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className='text'>Bán chạy nhất</div>
                                </div>
                                <div className='checkboxChoiceContent'>
                                    <input type="checkbox"
                                        checked={isChecked}
                                        className='custom-checkbox'
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className='text'>Thứ tự bảng chữ cái (từ A-Z)</div>
                                </div>
                                <div className='checkboxChoiceContent'>
                                    <input type="checkbox"
                                        checked={isChecked}
                                        className='custom-checkbox'
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className='text'>Thứ tự bảng chữ cái (từ Z-A)</div>
                                </div>
                                <div className='checkboxChoiceContent'>
                                    <input type="checkbox"
                                        checked={isChecked}
                                        className='custom-checkbox'
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className='text'>Giá (từ thấp đến cao)</div>
                                </div>
                                <div className='checkboxChoiceContent'>
                                    <input type="checkbox"
                                        checked={isChecked}
                                        className='custom-checkbox'
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className='text'>Giá (từ cap xuống thấp)</div>
                                </div>
                                <div className='checkboxChoiceContent'>
                                    <input type="checkbox"
                                        checked={isChecked}
                                        className='custom-checkbox'
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className='text'>Ngày (từ cũ đến mới)</div>
                                </div>
                                <div className='checkboxChoiceContent'>
                                    <input type="checkbox"
                                        checked={isChecked}
                                        className='custom-checkbox'
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className='text'>Ngày (từ mới đến cũ)</div>
                                </div>

                            </div>

                            : ""}



                    </div>

                    <div className="product-list">
                        {products.map((product) => (
                            <div key={product.id} className={`product-card ${product.soldOut ? "sold-out" : ""}`}>
                                <div className='img'>
                                    .....
                                </div>
                                <h2>{product.name}</h2>
                                <p>{product.price}</p>
                                <div className="rating">⭐ {product.rating} Đánh giá</div>
                                {product.soldOut ? (
                                    <button className="sold-out-btn">HẾT HÀNG</button>
                                ) : (
                                    <button className="add-btn">Thêm nhanh</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Accessories;
