import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signout } from '../actions/userActions';

export default function Header() {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const signoutHandler = () =>{
        dispatch(signout());
        return <Redirect to="/"></Redirect>
      }    

    return (
        <header className="header">
            <div className="brand">
                <button>&#9776;</button>
                <Link to="/">Ecommerce</Link>
            </div>
            
            <div className="header-links">
                <Link to="/cart">
                    Cart
                    {cartItems.length > 0 && (
                        <span className="badge"> {cartItems.length} </span>
                    )}
                </Link>
                {
                    userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                            <Link to="#">Adimin <i className="fa fa-caret-down"></i></Link>
                            <ul className="dropdown-content">
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><Link to="/products">Products</Link></li>
                                <li><Link to="/orders">Orders</Link></li>
                                <li><Link to="/users">Users</Link></li>
                            </ul>
                       </div> 
                    )
                }
                {
                    userInfo ? (
                        <div className="dropdown">
                            <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                            <ul className="dropdown-content">
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/orderhistory">Order history</Link></li>
                                <li><Link to="#signout" onClick={signoutHandler}>Signout</Link></li>
                            </ul>
                       </div> 
                    )
                    :
                    (
                        <Link to="/signin">Sign In</Link>
                    )
                }
            </div>
        </header>
    )
}
