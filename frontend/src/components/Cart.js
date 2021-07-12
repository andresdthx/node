import React from 'react'

export default function Cart() {
    return (
        <div className="card card-body cart">
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
                                (<span className="sucess">In Stock</span>):
                                (<span className="error">Unavailable</span>)
                            }
                        </div>
                    </div>
                </li>
                <li>
                    <button className="primary block">Add</button>
                </li>
            </ul>
        </div>
    )
}
