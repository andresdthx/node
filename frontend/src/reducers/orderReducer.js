import { 
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS, 
    ORDER_DELETE_FAIL, 
    ORDER_DELETE_REQUEST, 
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
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS
} from "../constants/orderConstants";

export const createOrderReducer = (state= {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true};
        case ORDER_CREATE_SUCCESS:
            return {loading: false, success: true, order: action.payload};
        case ORDER_CREATE_FAIL:
            return {loading: false, error: action.payload};
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const detailsOrderReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload};
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state;
    }
}

export const payOrderReducer = (state ={ success: false}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true };
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true };
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
}

export const orderHistoryReducer = ( state= { loading: true, orders: []}, action ) => {
    switch (action.type) {
        case ORDER_HISTORY_REQUEST:
            return { loading: true };
        case ORDER_HISTORY_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_HISTORY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const orderDeleteReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return { loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: true, success: action.payload };
        case ORDER_DELETE_FAIL:
            return { loading: true, error: action.payload };
        default:
            return state;
    }
}

export const listOrdersAdminReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ORDER_LIST_ADMIN_REQUEST:
            return { loading: true };
        case ORDER_LIST_ADMIN_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_LIST_ADMIN_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}