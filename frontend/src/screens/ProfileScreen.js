import React from 'react'
import { useSelector } from 'react-redux';
import FormUser from '../components/FormUser';

export default function ProfileScreen(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    if (!userInfo) {
        props.history.push('/signin');
    }

    return (
        <div>
            <FormUser data={{ user: userInfo, form: { title: 'Update profile', button: 'update'} }}></FormUser>
        </div>
    )
}
