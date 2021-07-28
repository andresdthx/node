import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { userProfileReducer, userRegisterReducer, userSigninReducer } from './reducers/userReducers';
import { createOrderReducer, detailsOrderReducer, listOrdersAdminReducer, orderDeleteReducer, orderHistoryReducer, payOrderReducer } from './reducers/orderReducer';
import { listBanksReducer, registerPaymentReducer } from './reducers/paymentReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        :   null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod: 'Paypal',
    }
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    createOrder: createOrderReducer,
    orderDetails: detailsOrderReducer,
    payOrder: payOrderReducer,
    orderHistory: orderHistoryReducer,
    updateUser: userProfileReducer,
    banksList: listBanksReducer,
    registerPayment: registerPaymentReducer,
    orderDelete: orderDeleteReducer,
    listOrders: listOrdersAdminReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;