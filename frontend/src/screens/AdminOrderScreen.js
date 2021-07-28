import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrdersAdmin } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function AdminOrderScreen() {
    const dispatch = useDispatch();

    const list = useSelector(state => state.listOrders);
    const { orders, loading, error } = list;

    useEffect(() => {
        dispatch(listOrdersAdmin());
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
                    <h2>Order list</h2>
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th>Actions</th>
                        </tr>
                        {
                            orders.map(item => (
                                <tr>
                                    <td>{item._id}</td>
                                    <td>{item.createdAt.split('T')[0]} {item.createdAt.split('T')[1]}</td>
                                    <td>${item.totalPrice.toFixed(2)}</td>
                                    <td>{ item.isPaid ? (<span className="success">Si</span>) : 'No' }</td>
                                    <td>
                                        { item.isDelivered ?
                                            (<span className="success">Si</span>)
                                            :
                                            (<span>
                                                No
                                                <button className = "button">Deliver</button>
                                            </span>)
                                        }
                                    </td>
                                    <td> <Link to={`/order/${item._id}`}>Details</Link></td>
                                </tr>
                            ))
                        }
                        <tr>
        
                        </tr>
                    </table>
                </div>
                )
            }
        </div>
    )
}
