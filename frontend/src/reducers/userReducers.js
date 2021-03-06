import { USERS_LIST_FAIL, USERS_LIST_REQUEST, USERS_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_SIGIN_FAIL, USER_SIGIN_REQUEST, USER_SIGIN_SIGNOUT, USER_SIGIN_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants";

export const userSigninReducer = (state ={}, action) =>{
    switch (action.type) {
        case USER_SIGIN_REQUEST:
            return {loading: true};
        case USER_SIGIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGIN_FAIL:
            return {loading: false, error: action.payload};
        case USER_SIGIN_SIGNOUT:
            return {};
        default:
            return state;
    }
}

export const userRegisterReducer = (state ={}, action) =>{
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_SIGIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userProfileReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const editUserReducer = ( state = { loading: true, success: false }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, user: action.payload, success: true };
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const usersListReducer = (state = { loading: true, users: [] }, action) => {
    switch (action.type) {
        case USERS_LIST_REQUEST:
            return { loading: true };
        case USERS_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case USERS_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const userListReducer = ( state = { loading: true }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, eror: action.payload };
    
        default:
            return state;
    }
}