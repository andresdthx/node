import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../actions/userActions';
import swal from 'sweetalert';

export default function FormUser(props) {

    const dispatch = useDispatch();

    const { user, form } = props.data;

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = (e) =>{
        e.preventDefault();
        if (password !== confirmPassword) {
            swal({
                text: "passwords not match",
                icon: "error",
              });
        } else {
            dispatch(updateUserProfile({...user, name: name, email:email, password: password}));
            setPassword('');
            setConfirmPassword('');
            swal({
                text: "Profile updated",
                icon: "success",
              });
        }
    }
    return (
        <div>
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
                    <label htmlFor="confirmPassword">Password</label>
                    <input
                        type="password"
                        id="confirmPasswords"
                        placeholder="Confirm password"
                        required
                        onChange={e => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">{form.button}</button>
                </div>
            </form>
        </div>
    )
}
