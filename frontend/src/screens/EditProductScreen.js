import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import swal from 'sweetalert';

export default function EditProductScreen(props) {

    const dispatch = useDispatch();

    const productId = props.match.params.id;

    const productDetail = useSelector( state => state.productDetail);
    const { product, loading, error } = productDetail;

    const productUpdate = useSelector( state => state.productUpdate);
    const { success, error: errorUpdated } = productUpdate;

    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [price, setPrice] = useState();
    const [countInStock, setStock] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        
        if(product){
                setBrand(product.brand);
                setName(product.name);
                setCategory(product.category);
                setPrice(product.price);
                setStock(product.countInStock);
                setDescription(product.description);
                if (product._id !== productId) {
                    dispatch(detailsProduct(productId));
                }

        } else {
            dispatch(detailsProduct(productId));
        }

    }, [dispatch, product, productId]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct(productId, {brand, name, category, price, countInStock, description}));
    }

    return (
        <div>
            {
            loading ? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox>{error}</MessageBox>
            :
            errorUpdated ? <MessageBox>{errorUpdated}</MessageBox>
            :
            (
            <form className="form" onSubmit={submitHandler}>
                {success && (<MessageBox>Product updated succesfully</MessageBox>)}
                <div>
                    <h1>Edit Product</h1>
                </div>
                <div>
                    <label htmlFor="brand">Brand</label>
                    <input
                        type="text"
                        id="brand"
                        placeholder="Enter brand"
                        value={brand}
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
                        value={name}
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
                        value={category}
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
                        value={price}
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
                        value={countInStock}
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
                        value={description}
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
