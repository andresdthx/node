import axios from 'axios';
import Axios from 'axios';
import {
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SIGIN_FAIL,
    USER_SIGIN_REQUEST,
    USER_SIGIN_SIGNOUT,
    USER_SIGIN_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_FAIL,
    USER_LIST_SUCCESS,
    USERS_LIST_REQUEST,
    USERS_LIST_FAIL,
    USERS_LIST_SUCCESS,
} from "../constants/userConstants"

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
        });
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: user});
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.put(`api/users/update/${user._id}`, user, {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        });

        const userUpdate = {...user,
            name: data.user.name,
            email: data.user.email
        };

        dispatch({type: USER_UPDATE_SUCCESS, payload: userUpdate});
        dispatch({ type: USER_SIGIN_SUCCESS, payload: userUpdate});
        localStorage.setItem('userInfo', JSON.stringify(userUpdate));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message:
            error.response
        });
    }
}

export const editUser = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST, data: user });
    const { userSignin: { userInfo } } = getState();

    try {
        const { data } = await Axios.put(`api/users/update/${user._id}`, user, {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message:
            error.response
        });  
    }
}

export const listUsers = () => async (dispatch, getState) => {
    dispatch({ type: USERS_LIST_REQUEST });

    const {userSignin: { userInfo } } = getState();

    try {
        const { data } = await axios.get('api/users',{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: USERS_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: USERS_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message:
            error.response
        }); 
    }
}

export const listUser = (id) => async(dispatch) => {
    dispatch({ type: USER_LIST_REQUEST });

    try {
        const { data } = await axios.get(`api/users/${id}`);
        dispatch( {type: USER_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message:
            error.response
        });   
    }
}

export const signout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({type: USER_SIGIN_SIGNOUT});
}