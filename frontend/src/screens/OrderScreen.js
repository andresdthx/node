import { detailsOrder, payOrder } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import FormPayment from '../components/FormPayment';
// impo MercadoPago from 'mercadopago';

export default function OrderScreen(props) {

    const orderId = props.match.params.id;

    const [sdkPayu, setSdkPayu] = useState(false);
    const [sdkMercado, setSdkMercado] = useState(false);

    const [errorPayment, setErrorPayment] = useState(null);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

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
            const mp = new window.MercadoPago('APP_USR-c27a943d-1333-44c3-9f7d-01da1ac8856e', {
                locale: 'es-CO'
            });
    
            mp.checkout({
                preference: {
                    id: data
                },
                render: {
                        container: '.cho-container', // Indica el nombre de la clase donde se mostrará el botón de pago
                        label: 'Pagar', // Cambia el texto del botón de pago (opcional)
                }
            });
        }


        if(successPay){
            dispatch({type: ORDER_PAY_RESET})
        }

        if(!order){
            dispatch(detailsOrder(orderId));
        }

        if(!window.MercadoPago){
            addMercadoPagoScript();
        }

        if (!window.paypal) {
            addPayPalScript();
        } else {
            setSdkPayu(true);
        }

    },[dispatch, orderId, successPay, sdkMercado]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    const errorPaymentHandler = (paymentResult) => {
        setErrorPayment(paymentResult);
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
                                    <MessageBox variant="success">Delivered at: {order.deliveredAt.split('T')[0]}</MessageBox>
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
                                    <MessageBox variant="success">Paid at: {order.paidAt.split('T')[0]}</MessageBox>
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
                                        {
                                            errorPayment && (
                                                <MessageBox variant="danger">{errorPayment}</MessageBox>
                                            )
                                        }
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
