import React from 'react'
import "./Navbar.scss"
import Logo from "../../assets/logo.svg"
import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'

import "./Navbar.scss"

const Navbar = () => {
    const {cart} = useSelector(state => state)
    
  return (
    <div className='container'>
        <nav className='nav'>
            <div className="logo">
                <img src={Logo} alt="" />
                <div className="logo-info">
                    <h2>react pizza</h2>
                    <p>самая вкусная пицца во вселенной</p>
                </div>
            </div>
            <Link to={"/cart"} className="cart-wrapper">
                <p>{cart.totalPrice}&#8381;</p>
                <IoCartOutline/>
                {cart.totalCount}
            </Link>
        </nav>
    </div>
  )
}

export default Navbar