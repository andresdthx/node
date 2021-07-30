import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { create } from '../actions/orderActions';
import { addToCart } from '../actions/cartActions';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

export default function PlaceOrderScreen(props) {

    const dispatch = useDispatch('');
    const cart = useSelector(state => state.cart);

    const createOrder = useSelector(state => state.createOrder);
    const { loading, success, error, order } = createOrder; 

    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a,c)=> a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = (e) => {
        dispatch(create({...cart, orderItems: cart.cartItems}));
    }

    useEffect(() =>{
        if(success){
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, props.history, order, success])
    return (
        <div>
            <CheckoutSteps step="4" />
            
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>{cart.shippingAddress.fullName} <br/>
                                    <strong>Address: </strong> {cart.shippingAddress.address}, 
                                    {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                                    {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method: </strong>{cart.paymentMethod} <br/>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order items</h2>
                                <div className="shopping-cart">
                                    {cart.cartItems.map((x) => (
                                        <div className="products-cart" key={x.product}>
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
                                            <div className="price-cart">{x.qty} x ${x.price} = ${x.qty * x.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Total</strong></div>
                                    <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0} className="primary block">Place order</button>
                            </li>
                            <li>
                                {/* <label/> */}
                                <button className="secundary block" type="button" onClick={() => props.history.push('/payment')}>back</button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
