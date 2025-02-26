
import React, { useState, useEffect } from 'react';
import './HomeAdmin.scss';
import { NavLink } from "react-router-dom";

const HomeAdmin = () => {


    return (
        <div className=''>


            <div className='adminNav'>
                <NavLink style={{ textDecoration: 'none' }} exact to="/homeAdmin/superAdmin" className='content' activeClassName='active'>Super Admin</NavLink>
                <NavLink style={{ textDecoration: 'none' }} to="/homeAdmin/productManager" className='content' activeClassName='active'>Quản lý sản phẩm  </NavLink>
                <NavLink style={{ textDecoration: 'none' }} to="/homeAdmin/orderManager" className='content' activeClassName='active'>Quản lý đơn hàng</NavLink>
                <NavLink style={{ textDecoration: 'none' }} to="/homeAdmin/customerManager" className='content' activeClassName='active'>Quản lý khách hàng</NavLink>

            </div>
            <div>

            </div>
        </div>
    );
};

export default HomeAdmin;
