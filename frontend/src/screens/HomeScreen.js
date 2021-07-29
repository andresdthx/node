import React, { useEffect } from 'react';

import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => { 
      dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
          <div className="home-brand col-1">
            <ul>
              <li>
                <Link to="/men">
                  <img className="brand-image" src="images/home_page/brand-m.jpg" alt="brand-men" />
                   <span className="brand-title-image-men">Men</span>
                </Link>
              </li>
              <li>
                <Link to="/woman">
                  <img className="brand-image" src="images/home_page/brand-w.jpg" alt="brand-women" />
                   <span className="brand-title-image-woman">Woman</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="home-list col-2">
              {loading ? <LoadingBox></LoadingBox>
              :
              error ? <MessageBox variant="danger">{error}</MessageBox>
              :
              (<ul className="products">
                {
                  products.map((product) =>(
                    <Product key={product._id} product={product}></Product>
                  ))
                }  
              </ul>)
              }
          </div>
        </div>
    )
}
