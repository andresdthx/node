import React, { useState } from 'react'

export default function Cart(props) {
    const {product, url} = props;
    const [qty, setQty] = useState(1);

    const addToCartHandler = () => {
        url.history.push(`/cart/${product._id}?qty=${qty}`)
    }

    return (
        <div>
            <ul>
                <li>
                    <div className="row">
                        <div>Price: </div>
                        <div className="price">${product.price}</div>
                    </div>
                </li>
                <li>
                    <div className="row">
                        <div>Status: </div>
                        <div className="status">
                            {
                                product.countInStock > 0 ?
                                (<span className="success">In Stock</span>):
                                (<span className="error">Unavailable</span>)
                            }
                        </div>
                    </div>
                </li>
                {
                    product.countInStock > 0 && (
                        <>
                        <li>
                            <div className="row">
                                <div>Qty</div>
                                <div>
                                    <select value={qty} onChange={e => setQty(e.target.value)}>
                                        {
                                            [...Array(product.countInStock).keys()].map( x => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </li>
                        <li>
                            <button onClick={addToCartHandler} className="primary block">Add</button>
                        </li>
                        </>
                    )
                }
            </ul>
        </div>
    )
}
