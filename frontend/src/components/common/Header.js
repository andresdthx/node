import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signout } from '../../actions/userActions';

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
                <Link to="/">S </Link>
            </div>
            
            <div className="header-links">
                <Link to="/cart">
                    <i class="fas fa-shopping-cart"></i>
                    {cartItems.length > 0 && (
                        <span className="badge"> {cartItems.length} </span>
                    )}
                </Link>
                {
                    userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                            <Link to="#">
                                <span><i class="fas fa-users-cog"></i></span>
                                <span>Admin</span>
                                <span><i className="fa fa-caret-down"></i></span>
                            </Link>
                            <ul className="dropdown-content">
                                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                                <li><Link to="/admin/products">Products</Link></li>
                                <li><Link to="/admin/orders">Orders</Link></li>
                                <li><Link to="/admin/users">Users</Link></li>
                            </ul>
                       </div> 
                    )
                }
                {
                    userInfo ? (
                        <div className="dropdown">
                            <Link to="#">
                                <span><i class="fas fa-user"></i></span>
                                <span>{userInfo.name}</span>
                                <span><i className="fa fa-caret-down"></i></span>
                            </Link>
                            <ul className="dropdown-content">
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/orderhistory">Order history</Link></li>
                                <li><Link to="#signout" onClick={signoutHandler}>Signout</Link></li>
                            </ul>
                       </div> 
                    )
                    :
                    (
                        <Link to="/signin">
                            <span><i class="fas fa-user"></i></span>
                            <span>Sign In</span>
                        </Link>
                    )
                }
            </div>
        </header>
    )
}
