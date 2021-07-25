import axios from "axios";
import { BANKS_PAYU_LIST_FAIL, 
    BANKS_PAYU_LIST_REQUEST,
    BANKS_PAYU_LIST_SUCCESS, 
    PSE_PAYU_SUBMIT_TRANSACTION_FAIL, 
    PSE_PAYU_SUBMIT_TRANSACTION_REQUEST,
    PSE_PAYU_SUBMIT_TRANSACTION_SUCCESS
} from "../constants/paymentConstants"

export const listBanks = () => async (dispatch) => {
    dispatch({ type: BANKS_PAYU_LIST_REQUEST });

    try {
        const { data } = await axios.get('/api/payment/payu/getBanks');
        dispatch({ type: BANKS_PAYU_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ 
            type: BANKS_PAYU_LIST_FAIL,
            payload:
               error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
       });
    }
}

export const registerPayment = (dataTransaction, order) => async (dispatch, getState) => {
    dispatch({type: PSE_PAYU_SUBMIT_TRANSACTION_REQUEST});

    const {orderDetails: { order } } = getState();

    try {
        const { data } = await axios.post('/api/payment/payu/pse/submit', { dataTransaction, order });
        dispatch({type: PSE_PAYU_SUBMIT_TRANSACTION_SUCCESS, payload: data});

    } catch (error) {
        dispatch({ 
            type: PSE_PAYU_SUBMIT_TRANSACTION_FAIL,
            payload:
               error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
       });
    }
}