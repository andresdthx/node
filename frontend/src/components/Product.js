import React from 'react'
import Cart from './Cart';
import Rating from './Rating';

export default function Product(props) {
    const {product} = props;

    return (
        <div>
            <li key={product._id}>
                <div  className="product">
                    <img className="product-image" src={product.image} alt={product.name} />
                    <div className="product-name"><a href={`/product/${product._id}`}>{product.name}</a> </div>
                    <div className="product-brand">{product.brand}</div>
                    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                    <div className="product-price">${product.price}</div> 
                </div>
            </li>    
        </div>
    )
}
