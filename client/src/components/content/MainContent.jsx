
import React, { useState, useEffect } from 'react';
import './MainContent.scss';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const MainContent = () => {

    const products = [
        { id: 1, name: 'Mũ Racer Helios', img: 'image1.jpg', price: '345,000 VND' },
        { id: 2, name: 'Belt Scottish Helios Black Silver', img: 'image2.jpg', price: '4,850,000 VND' },
        { id: 3, name: 'Tam Tiêm Luân Hồi Xà Helios Silver', img: 'image3.jpg', price: '1,550,000 VND' },
        { id: 4, name: 'Ống Hút Định Hải Thần Châm Helios Silver', img: 'image4.jpg', price: '2,850,000 VND' },
    ];


    const items = [

        <div className="item" data-value="1">
            <div className='product-item'>
                <div className="itemImage">
                    <p>Hình ảnh sẽ hiển thị tại đây</p>
                </div>
                <div className="itemInformation">
                    <div className='information'>Helios silver </div>
                    <div className='information'>1.500.000 VND</div>
                    <div className="rating">★★★★★  Đánh giá</div>
                </div>
                <button className='chooseSize'>Chọn size</button>


            </div>

        </div>,
        <div className="item" data-value="2">
            <div className='product-item'>
                <div className="itemImage">
                    <p>Hình ảnh sẽ hiển thị tại đây</p>
                </div>
                <div className="itemInformation">
                    <div className='information'>Helios silver </div>
                    <div className='information'>1.500.000 VND</div>
                    <div className="rating">★★★★★  Đánh giá</div>
                </div>
                <button className='chooseSize'>Chọn size</button>


            </div>
        </div>,
        <div className="item" data-value="3">
            <div className='product-item'>
                <div className="itemImage">
                    <p>Hình ảnh sẽ hiển thị tại đây</p>
                </div>
                <div className="itemInformation">
                    <div className='information'>Helios silver </div>
                    <div className='information'>1.500.000 VND</div>
                    <div className="rating">★★★★★  Đánh giá</div>
                </div>
                <button className='chooseSize'>Chọn size</button>


            </div>
        </div>,
        <div className="item" data-value="4">
            <div className='product-item'>
                <div className="itemImage">
                    <p>Hình ảnh sẽ hiển thị tại đây</p>
                </div>
                <div className="itemInformation">
                    <div className='information'>Helios silver </div>
                    <div className='information'>1.500.000 VND</div>
                    <div className="rating">★★★★★  Đánh giá</div>
                </div>
                <button className='chooseSize'>Chọn size</button>


            </div>
        </div>,
        <div className="item" data-value="5">
            <div className='product-item'>
                <div className="itemImage">
                    <p>Hình ảnh sẽ hiển thị tại đây</p>
                </div>
                <div className="itemInformation">
                    <div className='information'>Helios silver </div>
                    <div className='information'>1.500.000 VND</div>
                    <div className="rating">★★★★★  Đánh giá</div>
                </div>
                <button className='chooseSize'>Chọn size</button>


            </div>
        </div>,
        <div className="item" data-value="6">Slide 6</div>,
    ];
    const responsive = {
        0: { items: 1 }, // Hiển thị 1 slide trên màn hình nhỏ
        768: { items: 2 }, // Hiển thị 2 slide trên màn hình trung bình
        1024: { items: 4 }, // Hiển thị 4 slide trên màn hình lớn
    };


    return (
        <div className='mainContentContainer'>
            <div className='heroImage'>

            </div>
            <div className='productLauch'>
                <div className='title'>
                    Sản Phẩm Mới Ra Mắt!
                </div>
                <AliceCarousel mouseTracking
                    items={items}
                    responsive={responsive}
                    touchTracking
                    infinite={false}
                    disableButtonsControls={false}
                    disableDotsControls={true}
                    renderPrevButton={() => (
                        <button className="custom-prev-button">{'<'}</button>
                    )}
                    renderNextButton={() => (
                        <button className="custom-next-button">{'>'}</button>
                    )}
                />

            </div>
            <div className='image-preview'>
                <div className='left'>
                    ảnh
                </div>
                <div className='right'>
                    <h1>8 NĂM HÀNH TRÌNH CHẾ TÁC THỦ CÔNG BẠC</h1>
                    <h4>Mỗi món trang sức của Helios đều được chế tác thủ công bởi người thợ kim hoàn lành nghề, mang trọn tâm huyết và niềm đam mê trong từng nét chạm khắc tỉ mỉ.</h4>
                </div>
            </div>
            <div className='gallery-image'>
                <div className='title'>Danh Mục Sản Phẩm</div>
                <div className='product'>
                    <div className='ring box'>
                        <div className='img'>

                        </div>
                        <div className='text'>NHẪN BẠC NAM - KHẲNG ĐỊNH SỰ KHÁC BIỆT
                        </div>
                    </div>
                    <div className='necklace box'>
                        <div className='img'>

                        </div>
                        <div className='text'>DÂY CHUYỀN BẠC NAM - THIẾT KẾ ĐỘC BẢN
                        </div>

                    </div>
                    <div className='earrings box'>
                        <div className='img'>

                        </div>
                        <div className='text'>KHUYÊN TAI BẠC NAM - ĐỊNH HÌNH SỰ KHÁC BIỆT
                        </div>
                    </div>
                    <div className='bracelet box'>
                        <div className='img'>

                        </div>
                        <div className='text'>VÒNG TAY BẠC NAM - KHÁC BIỆT VỚI SỐ ĐÔNG

                        </div>
                    </div>

                </div>
            </div>
            <div className='meet'>
                <div className='title'>Helios Meet</div>
                <div className='content'>
                    <div className='collection'>
                        <div className='img'>

                        </div>
                        <div className='text'>
                            <h2>SUNFLOWER BLACK SILVER</h2>
                            <button>VIEW COLLECTION</button>
                        </div>
                    </div>
                    <div className='collection'>
                        <div className='img'>

                        </div>
                        <div className='text'>
                            <h2>LOTUS BLACK SILVER
                            </h2>
                            <button>VIEW COLLECTION</button>
                        </div>
                    </div>


                </div>

            </div>
            <div>

            </div>
        </div >

    );
};

export default MainContent;
