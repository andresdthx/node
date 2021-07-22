import { USER_SIGIN_FAIL, USER_SIGIN_REQUEST, USER_SIGIN_SIGNOUT, USER_SIGIN_SUCCESS } from "../constants/userConstants";

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