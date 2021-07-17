import {BrowserRouter, Route} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

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
                <Link to="/signin">Sign In</Link>
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
            <Route path="/cart/:id?" component={CartScreen}></Route> 
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="footer">
            All right reserved.
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
