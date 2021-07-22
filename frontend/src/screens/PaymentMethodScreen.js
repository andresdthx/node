import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

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
            <CheckoutSteps step1 step2 step3></CheckoutSteps>

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
                        <input type="radio" id="stripe" value="Stripe" name="paymentMethod" required onChange={e => setPaymetMethod(e.target.value)}></input>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                    <div>
                        <label/>
                        <button className="primary" type="submit">Continue</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
