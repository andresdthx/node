import axios from "axios";
import Axios from "axios";
import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_UPDATE_FAIL, 
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS} from "../constants/productConstants";

 export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    });
    try {
        const {data} = await Axios.get('/api/products');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message})
    }
 }

 export const detailsProduct = (productId) => async (dispatch) => {

     dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

     try {
         const { data } = await Axios.get(`/api/products/${productId}`);
         dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
     } catch (error) {
         dispatch({ 
             type: PRODUCT_DETAILS_FAIL,
             payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
     }
 }

export const updateProduct = (productId, product) => async (dispatch) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: productId});

    try {
        const { data } = await axios.put(`/api/products/update/${productId}`, {
            product: product
        });
        dispatch( { type: PRODUCT_UPDATE_SUCCESS, payload: data });
        
    } catch (error) {
        dispatch({ 
            type: PRODUCT_UPDATE_FAIL,
            payload:
               error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
       });
    }
}