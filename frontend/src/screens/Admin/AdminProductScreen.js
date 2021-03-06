import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

export default function AdminProductScreen() {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;

    useEffect(() => {
        dispatch(listProducts());
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
                    <h2>Products list</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Brand</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>In stock</th>
                                <th>Rating</th>
                                <th>Reviews</th>
                                <th>Description</th>
                                <th>Created at</th>
                                <th>Updated at</th>
                                <th>Actions</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            products.map(item => (
                                <tr key={item._id}>
                                    <td>{item.brand}</td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.price}</td>
                                    <td>{item.countInStock}</td>
                                    <td>{item.rating}</td>
                                    <td>{item.numReviews}</td>
                                    <td>{item.description}</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.updatedAt}</td>
                                    <td>
                                        <Link to={`/edit/product/${item._id}`}>
                                            <i className="fas fa-pen"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/product/${item._id}`}>
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
