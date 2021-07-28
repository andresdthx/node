import axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_HISTORY_FAIL,
    ORDER_HISTORY_REQUEST,
    ORDER_HISTORY_SUCCESS,
    ORDER_LIST_ADMIN_FAIL,
    ORDER_LIST_ADMIN_REQUEST,
    ORDER_LIST_ADMIN_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
} from "../constants/orderConstants";

export const create = (order) => async (dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});

    try {
        const { userSignin: { userInfo } } = getState();

        const { data } = await axios.post('/api/orders', order,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            }
        });
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data.order});
        dispatch({type: CART_EMPTY, payload: data.order});
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
}

export const detailsOrder = (orderId) => async (dispatch, getState) =>{
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId});

    const { userSignin: { userInfo } } = getState();

    try {
        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            }
        });
        dispatch({ type:ORDER_DETAILS_SUCCESS, payload: data});

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST});

    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            }
        });
        dispatch({type: ORDER_PAY_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
} 

export const orderHistory = () => async (dispatch, getState) => {
    dispatch({type: ORDER_HISTORY_REQUEST});

    try {
        const { userSignin: { userInfo } } = getState();

        const { data } = await axios.post('/api/orders/list',
        { id: userInfo._id, isAdmin: userInfo.isAdmin },
        {headers: { Authorization: `Bearer ${userInfo.token}` }}
        );

        dispatch({type: ORDER_HISTORY_SUCCESS, payload: data});
        
    } catch (error) {
        dispatch({
            type: ORDER_HISTORY_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
}

export const deleteOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELETE_REQUEST });
    const { userSignin: { userInfo } } = getState();

    try {
        const { data } = await axios.delete(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch( { type: ORDER_DELETE_SUCCESS, payload: data.deleteCount })
    } catch (error) {
        dispatch({
            type: ORDER_HISTORY_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
}

export const  listOrdersAdmin = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_ADMIN_REQUEST });

    const { userSignin: { userInfo } } = getState();

    try {
        const { data } = await axios.post('/api/orders/list/all', {
            id: userInfo._id,
            isAdmin: userInfo.isAdmin
        }, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: ORDER_LIST_ADMIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_ADMIN_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        }); 
    }
}