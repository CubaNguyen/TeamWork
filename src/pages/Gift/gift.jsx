import React from "react";
import "./styles_gift.scss";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const products = [
    { id: 1, name: "Mũ Racer Helios", img: "image1.jpg", price: "345,000 VND" },
    { id: 2, name: "Belt Scottish Helios Black Silver", img: "image2.jpg", price: "4,850,000 VND" },
    { id: 3, name: "Tam Tiêm Luân Hồi Xà Helios Silver", img: "image3.jpg", price: "1,550,000 VND" },
    { id: 4, name: "Ống Hút Định Hải Thần Châm Helios Silver", img: "image4.jpg", price: "2,850,000 VND" },
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

function Gift() { 
    return (
        <div className="container">
          <div className="noiDung">
            <div className="anh1">
              <p>Ảnh 1</p>
            </div>

            <div className="text">

               <h1>ĐEP TRAI NHẤT TRÁI ĐẤT</h1>
               <p>tự tin là 1 ngừoi đẹp trai nhất trái đất này</p>
               <p>iweoiqiowe</p>
                
                
            </div>
           </div>
           

           <div>
             <AliceCarousel mouseTracking
             items = {items}
             responsive={responsive}
             touchTracking
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
            <div className="tren">
                <h2>BAN CAN QUA TANG CHO...</h2>
            </div>
            
            <div className="duoi">
                <div className="box">
                    anh 1
                </div>
                
                <div className="box">
                    anh 2
                </div>
            </div>

            <div className="tren">
                <h2>QUA TANG DA TANG Y NGHIA</h2>
            </div>
            <div className="duoi">
            <div className="box">
                    anh 1
                </div>
                
                <div className="box">
                    anh 2
                </div>
            </div>

            <div className="image">
                <div className="text-container"> 
                    <div className="overlay-text">Chữ đè lên ảnh </div>
                </div>
            </div>
            
            <div className="tren">
                <h2>GHE THAM HELIOS</h2>
            </div>
            <div className="duoi">
                <div className="box">
                    anh 1
                </div>
                
                <div className="box">
                    anh 2
                </div>
            </div>
        </div>
      );
      
}
export default Gift;