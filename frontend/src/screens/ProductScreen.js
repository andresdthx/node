// import data from '../data';
import React, { useEffect } from 'react'
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetail = useSelector(state => state.productDetail);
    const { loading, error, product } = productDetail;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    return (
        <div>
            {loading ? <LoadingBox></LoadingBox>
            : 
            error ? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
            <div>
            <Link to="/">Back to result</Link>
            <div className="row top">
                <div className="col-2">
                    <img className="large" src={product.image} alt={product.name}/>
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                        </li>
                        <li>
                            Price : ${product.price}
                        </li>
                        <li>
                            Description : {product.description}
                        </li>
                    </ul>
                </div>
                <div className="col-1 card card-body">
                    <Cart url={props} product={product}></Cart>
                </div>
            </div>
            </div>  
            )
            }
        </div>
    )
}
