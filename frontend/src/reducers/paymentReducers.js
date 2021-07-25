import {
    BANKS_PAYU_LIST_FAIL, 
    BANKS_PAYU_LIST_REQUEST, 
    BANKS_PAYU_LIST_SUCCESS, 
    PSE_PAYU_SUBMIT_TRANSACTION_FAIL, 
    PSE_PAYU_SUBMIT_TRANSACTION_REQUEST,
    PSE_PAYU_SUBMIT_TRANSACTION_SUCCESS
} from "../constants/paymentConstants";

export const listBanksReducer = (state ={ loading: true, data: [] }, action) =>{
    switch (action.type) {
        case BANKS_PAYU_LIST_REQUEST:
            return { loading: true };
        case BANKS_PAYU_LIST_SUCCESS:
            return { loading: false, data: action.payload};
        case BANKS_PAYU_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const registerPaymentReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case PSE_PAYU_SUBMIT_TRANSACTION_REQUEST:
            return { loading: true };
        case PSE_PAYU_SUBMIT_TRANSACTION_SUCCESS:
            return { loading: false, pseTransaction: action.payload};
        case PSE_PAYU_SUBMIT_TRANSACTION_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}