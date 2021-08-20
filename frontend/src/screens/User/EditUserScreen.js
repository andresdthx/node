import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listUser } from '../../actions/userActions';
import FormUser from '../../components/FormUser';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

export default function EditUserScreen(props) {
    const id = props.match.params.id;
    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const { user, loading, error } = userList;

    useEffect(()=>{
        dispatch(listUser(id));
    }, [dispatch, id])
    return (
        <div>
            {
                loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                <FormUser data={{ user: user, form: { title: 'Edit profile', button: 'update'}}} edit></FormUser>
            }
        </div>
    )
}
