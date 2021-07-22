import Axios from 'axios';
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGIN_FAIL, USER_SIGIN_REQUEST, USER_SIGIN_SIGNOUT, USER_SIGIN_SUCCESS } from "../constants/userConstants"

export const signin = (email, password) => async (dispatch) =>{
    dispatch({type:USER_SIGIN_REQUEST, payload:{email, password}});

    try {
      const {data} = await Axios.post('api/users/signin', { email, password });
      dispatch({ type: USER_SIGIN_SUCCESS, payload: data});
      localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type:USER_SIGIN_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message:
            error.response
        })
    }
}

export const register = (name, email, password) => async (dispatch) =>{
    dispatch({type:USER_REGISTER_REQUEST, payload:{name, email, password}});

    try {
      const {data} = await Axios.post('api/users/register', { name, email, password });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data});
      dispatch({ type: USER_SIGIN_SUCCESS, payload: data});
      localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message:
            error.response
        })
    }
}

export const signout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({type: USER_SIGIN_SIGNOUT});
}