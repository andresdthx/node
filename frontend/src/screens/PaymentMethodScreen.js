import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/checkout/CheckoutSteps';

export default function PaymentMethodScreen(props) {

    const [paymetMethod, setPaymetMethod] = useState('Paypal');
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymetMethod));
        props.history.push('/placeorder');
    }

    return (
        <div>
            <CheckoutSteps step="3" />

            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>
                        Payment Method
                    </h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="paypal" value="PayPal" name="paymentMethod" required checked onChange={e => setPaymetMethod(e.target.value)}></input>
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                    <div>
                        <input type="radio" id="creditCard" value="Creditcard" name="paymentMethod" required onChange={e => setPaymetMethod(e.target.value)}></input>
                        <label htmlFor="Creditcard">Tarjeta de credito</label>
                    </div>
                    <div>
                        <input type="radio" id="pse" value="pse" name="paymentMethod" required onChange={e => setPaymetMethod(e.target.value)}></input>
                        <label htmlFor="pse">PSE</label>
                    </div>
                    <div>
                        <label/>
                        <button className="primary block" type="submit">Continue</button>
                    </div>

                    <div>
                        <label/>
                        <button className="secundary block" type="button" onClick={() => props.history.push('/shipping')}>back</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
