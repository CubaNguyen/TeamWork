

import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss'
import MiniNavBar from './MiniNavBar';

const Navbar = () => {

    const [showJewelry, setShowJewelry] = useState(false);
    const [showGift, setShowGift] = useState(false);

    return (
        <>
            <div className='navbarContainer'>
                <div className='topNav'>
                    <div className='left'>
                        <div>GLOBAL SHOP</div>
                        <div>ELDER</div>
                        <div>ABOUT US</div>
                        <div>STORE</div>
                    </div>
                    <div className='middle'>
                        HELIOS
                    </div>
                    <div className='right'>
                        <div>icon</div>
                        <div>icon</div>
                        <div>icon</div>
                    </div>
                </div>

                <div className='bottomNav'>
                    <div className="navItem"
                        onMouseEnter={() => setShowJewelry(true)}
                        onMouseLeave={() => setShowJewelry(false)}
                    >JEWELRY</div>
                    <div className="navItem"
                        onMouseEnter={() => setShowGift(true)}
                        onMouseLeave={() => setShowGift(false)}
                    >HOLIDAY GIFT</div>
                    <div className="navItem">COLLECTIONS</div>
                    <div className="navItem">ACCESSORIES</div>
                    <div className="navItem">EYEWEAR</div>
                    <div className="navItem">SALE OFF</div>
                </div>

                {showJewelry && (
                    <div
                        onMouseLeave={() => setShowJewelry(false)}
                        onMouseEnter={() => setShowJewelry(true)}
                        style={{
                            position: 'absolute',
                            top: '13%',
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
                            top: '13%',
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

