import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editUser, updateUserProfile } from '../actions/userActions';
import swal from 'sweetalert';
import MessageBox from './MessageBox';

export default function FormUser(props) {

    const dispatch = useDispatch();
    const { user, form } = props.data;

    const userEdit = useSelector(state => state.userEdit);
    const { success } = userEdit;

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [admin, setAdmin] = useState(user.isAdmin);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = (e) =>{
        e.preventDefault();

        if (password !== confirmPassword && !props.edit) {
            swal({
                text: "passwords not match",
                icon: "error",
            });
        } else {
            if(props.edit){
                dispatch(editUser({...user, name: name, email:email, isAdmin: admin, edit: true}));
            } else {
                dispatch(updateUserProfile({...user, name: name, email:email, password: password, isAdmin: admin}));
                setPassword('');
                setConfirmPassword('');
            }
        }
    }

    return (
        <div>
            {success && <MessageBox>UserUpdated</MessageBox>}
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>{form.title}</h1>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Enter email"
                        required
                        onChange={e => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        placeholder="Enter name"
                        required
                        onChange={e => setName(e.target.value)}
                    ></input>
                </div>
                {
                    props.edit ? (
                    <div>
                        <div>
                            <label htmlFor="password">Admin</label>
                            <select value={admin} onChange={ e => setAdmin(e.target.value)}>
                                <option value={false}>NO</option>
                                <option value={true}>Yes</option>
                            </select>
                        </div>
                    </div>
                    )
                    :
                    (
                    <>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                required
                                onChange={e => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword"> confirm password</label>
                            <input
                                type="password"
                                id="confirmPasswords"
                                placeholder="Confirm password"
                                required
                                onChange={e => setConfirmPassword(e.target.value)}
                            ></input>
                        </div>
                    </>
                    )
                }

                <div>
                    <label />
                    <button className="primary" type="submit">{form.button}</button>
                </div>
            </form>
        </div>
    )
}
