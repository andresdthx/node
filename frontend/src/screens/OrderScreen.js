import { deleteOrder, detailsOrder, payOrder } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import FormPayment from '../components/FormPayment';
import { updateProduct } from '../actions/productActions';

export default function OrderScreen(props) {

    const orderId = props.match.params.id;

    const [sdkPayu, setSdkPayu] = useState(false);
    const [sdkMercado, setSdkMercado] = useState(false);

    // const [errorPayment, setErrorPayment] = useState(null);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const removeOrder = useSelector((state => state.orderDelete));
    const { success: successDelete } = removeOrder;

    const orderPaid = useSelector(state => state.payOrder);
    const { success: successPay } = orderPaid;

    const dispatch = useDispatch('');
    
    useEffect(() =>{

        const addPayPalScript = async () => {
            const {data} = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkPayu(true);
            };
            document.body.appendChild(script);
        };

        const addMercadoPagoScript = () => {
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://sdk.mercadopago.com/js/v2`;
            script.async = true;
            script.onload = () => {
                setSdkMercado(true);
                loadButton();
            };
            document.body.appendChild(script);
        };

        const loadButton = async () => {
            const { data } = await axios.post('/api/payment/mercado-pago/preference',{
                "preference": {
                    "items": [
                    {
                        "title": "Mi producto",
                        "unit_price": 100,
                        "quantity": 1
                    }
                    ]
                }
            });
            const mp = new window.MercadoPago('TEST-8880b620-b177-4bb3-b649-682bba3be44c', {
                locale: 'es-CO'
            });
    
            mp.checkout({
                preference: {
                    id: data
                },
                render: {
                        container: '.cho-container', // Indica el nombre de la clase donde se mostrar?? el bot??n de pago
                        label: 'Pagar', // Cambia el texto del bot??n de pago (opcional)
                }
            });
        }


        if(successPay){
            dispatch({type: ORDER_PAY_RESET})
        }

        dispatch(detailsOrder(orderId));

        if(!window.MercadoPago){
            addMercadoPagoScript();
        } else {
            loadButton();
            setSdkMercado(true);
        }

        if (!window.paypal) {
            addPayPalScript();
        } else {
            setSdkPayu(true);
        }

    },[dispatch, orderId, successPay]);

    const successPaymentHandler = (paymentResult) => {
        updateProductCount();
        // dispatch(payOrder(order, paymentResult));
    }

    const updateProductCount = () =>{
        // order.orderItems.map( item => console.log(item));
        order.orderItems.map( item => dispatch(updateProduct(item._id, {...item, countInStock: item.qty})));
    }

    const errorPaymentHandler = (paymentResult) => {
        // setErrorPayment(paymentResult);
    }

    const orderDelete = () => {
        dispatch(deleteOrder(orderId));
        if(successDelete){
            props.history.push('/orderhistory');
        }
    }
    
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
                                <h3>Order: {order._id}</h3>
                                {
                                    !order.isPaid && 
                                    (
                                        <button className="danger" onClick={() => orderDelete()}>Delete order</button>
                                    )
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h3>Shipping</h3>
                                <p>
                                    <strong>Name: </strong>{order.shippingAddress.fullName} <br/>
                                    <strong>Address: </strong> {order.shippingAddress.address}, 
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ?
                                    <MessageBox variant="success">Delivered at: {order.deliveredAt.split('T')[0]}</MessageBox>
                                :
                                    <MessageBox variant="danger">Not delivered</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h3>Payment</h3>
                                <p>
                                    <strong>Method: </strong>{order.paymentMethod} <br/>
                                </p>
                                {order.isPaid ?
                                    <MessageBox variant="success">Paid at: {order.paidAt.split('T')[0]}</MessageBox>
                                :
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h3>Order items</h3>
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
                                <h3>Order summary</h3>
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
                            {
                                !order.isPaid && (
                                    <>
                                    {order.paymentMethod === 'Paypal' ?
                                    (
                                    <li>
                                        {!sdkPayu ? (<LoadingBox></LoadingBox>)
                                        :
                                        (
                                            <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} onError={errorPaymentHandler}></PayPalButton>
                                        )}
                                    </li>
                                    )
                                    : order.paymentMethod === 'pse' ?
                                    (
                                        <li>
                                            <FormPayment></FormPayment>
                                        </li>
                                    )
                                    :
                                    (
                                        <li>
                                        {!sdkMercado ? (<LoadingBox></LoadingBox>)
                                        :
                                        (
                                            <div className="cho-container"></div>
                                        )}
                                    </li>
                                    )
                                    }
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
