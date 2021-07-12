import React from 'react'
import Product from '../components/Product';
import data from '../data';

export default function HomeScreen() {
    return (
        <div>
            <ul className="products">
              {
                data.products.map((product) =>(
                  <Product key={product._id} product={product}></Product>
                ))
              }  
            </ul>
        </div>
    )
}
