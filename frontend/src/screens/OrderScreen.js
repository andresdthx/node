import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import { addToCart } from '../actions/cartActions';
// import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import { ORDER_CREATE_RESET } from '../constants/orderConstants';

export default function OrderScreen(props) {

    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const dispatch = useDispatch('');
    
    useEffect(() =>{
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);
    
    return loading ? (<LoadingBox></LoadingBox>):
    order === undefined ? (<LoadingBox></LoadingBox>) :
    error ? (<MessageBox variant="danger">{error}</MessageBox>)
    :
    (
        <div>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Order: {order._id}</h2>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>{order.shippingAddress.fullName} <br/>
                                    <strong>Address: </strong> {order.shippingAddress.address}, 
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ?
                                    <MessageBox variant="success">Delivered at: {order.deliveredAt}</MessageBox>
                                :
                                    <MessageBox variant="danger">Not delivered</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method: </strong>{order.paymentMethod} <br/>
                                </p>
                                {order.isPaid ?
                                    <MessageBox variant="success">Paid at: {order.paidAt}</MessageBox>
                                :
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order items</h2>
                                    <div className="shopping-cart">
                                        {order.orderItems.map((x) => (
                                            <div className="products-cart" key={x.product}>
                                                <img src={x.image} className="image-cart" alt={x.name} />
                                                <div className="name-cart"><Link to={`/product/${x.product}`}> {x.name} </Link></div>
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
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Total</strong></div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                </div>
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
