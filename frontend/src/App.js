import {BrowserRouter, HashRouter, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import { Link } from 'react-router-dom';
import SigninScreen from './screens/User/SigninScreen';
import RegisterScreen from './screens/User/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/User/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AdminOrderScreen from './screens/Admin/AdminOrderScreen';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';
import Checkout from './components/checkout/CheckoutSteps';
import AdminProductScreen from './screens/Admin/AdminProductScreen';
import EditProductScreen from './screens/EditProductScreen';
import AdminUserScreen from './screens/Admin/AdminUserScreen';
import EditUserScreen from './screens/User/EditUserScreen';

function App() {

  return (
    <BrowserRouter>
    <div className="grid-container">
    
        <HashRouter>
            <Header></Header>
        </HashRouter>

        <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button className="sidebar-close-button">x</button>
            <ul>
                <li><Link to="index.html">Pants</Link></li>
                <li><Link to="index.html">Shirts</Link></li>
            </ul>
        </aside>

        {/* <main className="main"> */}
            <HashRouter>
                <Route path="/signin" component={SigninScreen}></Route>
                <Route path="/register" component={RegisterScreen}></Route>
                <Route path="/cart/:id?" component={CartScreen}></Route> 
                <Route path="/product/:id" component={ProductScreen}></Route>
                <Route path="/edit/product/:id" component={EditProductScreen}></Route>
                <Route path="/" component={HomeScreen} exact></Route>
                <Route path="/shipping" component={ShippingAddressScreen}></Route>
                <Route path="/checkout" component={Checkout}></Route>
                <Route path="/payment" component={PaymentMethodScreen}></Route>
                <Route path="/placeorder" component={PlaceOrderScreen}></Route>
                <Route path="/order/:id" component={OrderScreen}></Route>
                <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
                <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>

                <PrivateRouteAdmin path="/admin/orders" component={AdminOrderScreen}></PrivateRouteAdmin>
                <PrivateRouteAdmin path="/admin/products" component={AdminProductScreen}></PrivateRouteAdmin>
                <PrivateRouteAdmin path="/admin/users" component={AdminUserScreen}></PrivateRouteAdmin>
                <PrivateRouteAdmin path="/edit/users/:id" component={EditUserScreen}></PrivateRouteAdmin>
            </HashRouter>
        {/* </main> */}

        <HashRouter>
            <Footer></Footer>
        </HashRouter>
    </div>
    </BrowserRouter>
  );
}

export default App;
