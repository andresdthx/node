import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listUsers } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

export default function AdminUserScreen() {
    const dispatch = useDispatch();

    const usersList = useSelector(state => state.usersList);
    const { users, loading, error } = usersList;

    useEffect(()=>{
        dispatch(listUsers());
    }, [dispatch])
    return (
        <div>
            {
            loading ? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
            <div className="table-content">
                <h2>Users list</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Id</th>
                            <th>Created At</th>
                            <th>Update At</th>
                            <th>Edit</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users.map(item => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    {item.isAdmin ? "Si" : "No"}
                                </td>
                                <td>{item._id}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.updatedAt}</td>
                                <td>
                                    <Link to={`/edit/users/${item._id}`}>
                                        <i className="fas fa-pen"></i>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/users/${item._id}`}>
                                        <i className="fas fa-eye"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            )
            }
        </div>
    )
}
