import Product from '../components/Product';
import data from '../data';
import React from 'react'
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';

export default function ProductScreen(props) {
    const product = data.products.find(x => x._id === props.match.params.id)

    if (!product) {
        return <div>Product Not Found</div>
    }
    return (
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
            </div>
        </div>
    )
}
