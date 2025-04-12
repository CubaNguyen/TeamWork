import React, { useState, useEffect } from 'react';
import './AllProducts.scss';

const AllProducts = () => {
    const [expanded, setExpanded] = useState({});

    const toggleExpand = (category) => {
        setExpanded((prevState) => ({
            ...prevState,
            [category]: !prevState[category],
        }));
    };

    const categories = ['Giá', 'Cỡ', 'Kênh bán hàng', 'Loại đá', 'Sale'];

    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 476.79998779296875) {

            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const products = [
        {
            name: 'Aten Helios Silver',
            price: '1,550,000 VND',
            label: 'NEW',
            tag: 'ONLY STORE',
            reviews: 0,
            buttonText: 'CHỌN SIZE',
        },
        {
            name: 'Apeiron Helios Silver',
            price: 'from 1,750,000 VND',
            label: 'NEW',
            tag: '',
            reviews: 0,
            buttonText: 'CHỌN SIZE',
        },
        {
            name: 'Kính HELIOS RHODES - STONE LOTUSGOT',
            price: '1,995,000 VND',
            label: '',
            tag: '',
            reviews: 0,
            buttonText: 'CHỌN SIZE',
        },
        {
            name: 'Kính HELIOS RHODES - STONE LOTUSGOT',
            price: '1,995,000 VND',
            label: '',
            tag: '',
            reviews: 0,
            buttonText: 'CHỌN SIZE',
        },
        {
            name: 'Kính HELIOS RHODES - STONE LOTUSGOT',
            price: '1,995,000 VND',
            label: '',
            tag: '',
            reviews: 0,
            buttonText: 'CHỌN SIZE',
        },
        {
            name: 'Kính HELIOS RHODES - STONE LOTUSGOT',
            price: '1,995,000 VND',
            label: '',
            tag: '',
            reviews: 0,
            buttonText: 'CHỌN SIZE',
        },
        {
            name: 'Kính HELIOS RHODES - STONE LOTUSGOT',
            price: '1,995,000 VND',
            label: '',
            tag: '',
            reviews: 0,
            buttonText: 'CHỌN SIZE',
        },
        {
            name: 'Kính HELIOS RHODES - STONE LOTUSGOT',
            price: '1,995,000 VND',
            label: '',
            tag: '',
            reviews: 0,
            buttonText: 'CHỌN SIZE',
        },
        {
            name: 'Kính HELIOS RHODES - STONE LOTUSGOT',
            price: '1,995,000 VND',
            label: '',
            tag: '',
            reviews: 0,
            buttonText: 'CHỌN SIZE',
        }
    ];

    return (
        <div className="allProductsContainer">
            <div className="header">Hi</div>
            <div className="product-gallery-container">
                <div className={`category-list ${isScrolled ? "scrolled" : ""}`}>
                    {categories.map((category, index) => (
                        <div key={index} className="category-item">
                            <div
                                className="category-header"
                                onClick={() => toggleExpand(category)}
                            >
                                <span>{category}</span>
                                <span>{expanded[category] ? '-' : '+'}</span>
                            </div>
                            {expanded[category] && (
                                <div className="category-content">
                                    {/* Add content for each category here */}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className={`product-gallery ${isScrolled ? "scrolled" : ""}`}>
                    {products.map((product, index) => (
                        <div className="product-card" key={index}>
                            <div className="product-image">
                                {/* Replace with your image */}
                            </div>
                            <div className="product-details">
                                <h2>{product.name}</h2>
                                <p>{product.price}</p>
                                {/* {product.label && <span className="label">{product.label}</span>}
                                {product.tag && <span className="tag">{product.tag}</span>} */}
                                <p>{product.reviews} reviews</p>
                                <button>{product.buttonText}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default AllProducts;
