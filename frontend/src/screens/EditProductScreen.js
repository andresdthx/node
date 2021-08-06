import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function EditProductScreen(props) {

    const dispatch = useDispatch();

    const productId = props.match.params.id;

    const productDetail = useSelector( state => state.productDetail);
    const { product, loading, error } = productDetail;

    const [brand, setBrand] = useState(product.brand);
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        dispatch(detailsProduct(productId));
        // setBrand(product.brand);
        // setBrand(product.name);
        // setBrand(product.category);
        // setBrand(product.price);
        // setBrand(product.stock);
        // setBrand(product.description);
    }, [dispatch]);

    return (
        <div>
            {
            loading ? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox>{error}</MessageBox>
            :
            (
            <form className="form">
                <div>
                    <h1>Edit Product</h1>
                </div>
                <div>
                    <label htmlFor="brand">Brand</label>
                    <input
                        type="text"
                        id="brand"
                        placeholder="Enter brand"
                        required
                        onChange={e => setBrand(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter name"
                        required
                        onChange={e => setName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="category">category</label>
                    <input
                        type="text"
                        id="category"
                        placeholder="Enter category"
                        required
                        onChange={e => setCategory(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        placeholder="Enter price"
                        required
                        onChange={e => setPrice(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="stock">Stock</label>
                    <input
                        type="number"
                        id="stock"
                        placeholder="Enter stock"
                        required
                        onChange={e => setStock(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        placeholder="Enter description"
                        required
                        onChange={e => setDescription(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Update</button>
                </div>
            </form>
            )
            }   
        </div>
    )
}
