

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss'
import MiniNavBar from './MiniNavBar';
import { NavLink } from "react-router-dom";
import { UserContext } from '../../context/UserContext';


const Navbar = () => {

    const [showJewelry, setShowJewelry] = useState(false);
    const [showGift, setShowGift] = useState(false);

    const user = useContext(UserContext)

    return (
        <>
            <div className='navbarContainer'>
                <div className='topNav'>
                    <div className='left'>
                        <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/global">GLOBAL SHOP</NavLink>
                        <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/contact">CONTACT</NavLink>
                        <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/about">ABOUT US</NavLink>
                        <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/collections/accessories">STORE</NavLink>


                    </div>
                    <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/" className='middle'>
                        HELIOS
                    </NavLink>
                    <div className='right'>
                        {user.isAuthenticated ? <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/account">Xin chào, {user.user.username}</NavLink> :
                            <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/login">Đăng ký / Đăng nhập</NavLink>
                        }

                        <div>icon</div>
                        <div>icon</div>
                    </div>
                </div>

                <div className='bottomNav'>
                    <NavLink style={{ color: 'white' }} to="/allproduct" className="navItem"
                        onMouseEnter={() => setShowJewelry(true)}
                        onMouseLeave={() => setShowJewelry(false)}
                    >JEWELRY</NavLink>
                    <NavLink style={{ color: 'white' }} to="/holidayGift" className="navItem"
                        onMouseEnter={() => setShowGift(true)}
                        onMouseLeave={() => setShowGift(false)}
                    >HOLIDAY GIFT</NavLink>
                    <NavLink style={{ color: 'white' }} to="/ourCollections" className="navItem">COLLECTIONS</NavLink>
                    <NavLink style={{ color: 'white' }} to="/collections/accessories" className="navItem">ACCESSORIES</NavLink>
                    <div className="navItem">EYEWEAR</div>
                    <div className="navItem">SALE OFF</div>
                </div>

                {showJewelry && (
                    <div
                        onMouseLeave={() => setShowJewelry(false)}
                        onMouseEnter={() => setShowJewelry(true)}
                        style={{
                            position: 'absolute',
                            top: '101%',
                            left: 0,
                            width: "100%",
                        }}
                    >
                        <MiniNavBar />
                    </div>
                )}

                {showGift && (
                    <div
                        onMouseLeave={() => setShowGift(false)}
                        onMouseEnter={() => setShowGift(true)}
                        style={{
                            position: 'absolute',
                            top: '101%',
                            left: 0,
                            width: "100%",
                        }}
                    >
                        <MiniNavBar isGift={true} />
                    </div>
                )}

            </div>
        </>
    );
}

export default Navbar;

