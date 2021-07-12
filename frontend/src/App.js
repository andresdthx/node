import {BrowserRouter, Route} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick="openMenu()">&#9776;</button>
                <a href="/">Ecommerce</a>
            </div>
            <div className="header-links">
                <a href="/cart">Cart</a>
                <a href="/signin">Sign In</a>
            </div>
        </header>
        <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button className="sidebar-close-button" onClick="closeMenu()">x</button>
            <ul>
                <li><a href="index.html">Pants</a></li>
                <li><a href="index.html">Shirts</a></li>
            </ul>
        </aside>
        <main className="main">
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