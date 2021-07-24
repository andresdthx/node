import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { orderHistory } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';

export default function OrderHistoryScreen() {

    const dispatch = useDispatch();
    
    const historyOrder = useSelector(state => state.orderHistory);
    const { orders, error, loading } = historyOrder;

    useEffect(() =>{
        dispatch(orderHistory());
    }, [dispatch]);
    return (
        <div>
            {
                loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                orders.length === 0 ? <MessageBox variant="danger">No orders yet. <Link to="/"> Go to shopping</Link></MessageBox>
                :
                (
                <div className="table-content">
                    <h2>Order history</h2>
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
                                    <td>{ item.isPaid ? 'Si' : 'No' }</td>
                                    <td>{ item.isDelivered ? 'Si' : 'No' }</td>
                                    <td> <Link target='_blank' to={`/order/${item._id}`}>Details</Link></td>
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
