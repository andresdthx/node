import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {

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
    <BrowserRouter>
    <div className="grid-container">
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
        <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button className="sidebar-close-button">x</button>
            <ul>
                <li><Link to="index.html">Pants</Link></li>
                <li><Link to="index.html">Shirts</Link></li>
            </ul>
        </aside>
        <main className="main">
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route> 
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            <Route path="/profile" component={ProfileScreen}></Route>
        </main>
        <footer className="footer">
            All right reserved.
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
