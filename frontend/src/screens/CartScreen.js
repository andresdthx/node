import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;

    const qty =  props.location.search
            ? Number(props.location.search.split('=')[1])
            : 1;

    useEffect(()=>{
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);


    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id));
    }
    const checkoutHandler = () => {
        props.history.push('/sigin?redirect=shipping');
    }
    return (
        <div>
            {
                cartItems.length > 0
                ?
                <div className="shopping">
                    <span className="title-cart">Shopping cart</span>
                    <div className="shopping-content">
                        <div className="shopping-cart">
                        {cartItems.map((x) => (
                            <div className="products-cart">
                                <img src={x.image} className="image-cart" alt={x.name} />
                                <div className="name-cart"><Link to={`/product/${x.product}`}> {x.name} </Link></div>
                                <div className="qty-cart">
                                    <select value={x.qty} onChange={e => dispatch(addToCart(x.product, Number(e.target.value)))}>
                                            {
                                                [...Array(x.countInStock).keys()].map( x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                    </select>
                                </div>
                                <div className="price-cart">${x.price}</div>
                                <div className="delete-cart"><button onClick={() => removeFromCartHandler(x.product)}>Delete</button></div>
                            </div>
                        ))}
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <h2>
                                            Subtotal ({cartItems.reduce((a, c)=> a + c.qty, 0)} items): $
                                            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                                        </h2>
                                    </li>
                                    <li>
                                        <button
                                        type="button"
                                        onClick={checkoutHandler}
                                        className="primary block"
                                        disabled={cartItems.length === 0}>
                                            Proceed to Checkout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                :
                (<MessageBox>Cart is empty <Link to={"/"}>Go to shopping</Link></MessageBox>)
            }
        </div>
    )
}
