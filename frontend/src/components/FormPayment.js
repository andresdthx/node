import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listBanks, registerPayment } from '../actions/paymentActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export default function FormPayment() {

    const dispatch = useDispatch();

    const banksList = useSelector(state => state.banksList);
    const { data, loading, error } = banksList;

    const paymentState = useSelector(state => state.registerPayment);
    const { pseTransaction, loading: loadingPse } = paymentState;

    const [bank, setBank] = useState('');
    const [name, setName] = useState('');
    const [typeClient, setTypeClient] = useState('N');
    const [identification, setIdentification] = useState('');
    const [typeIdentification, setTypeIdentification] = useState('CC');
    const [phone, setPhone] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerPayment(
            {
                bank, 
                name, 
                typeClient, 
                identification, 
                typeIdentification, 
                phone
            }
        ));
    }

    useEffect(() => {
        dispatch(listBanks());
    }, [dispatch], loadingPse, pseTransaction);

    return (

        <div>
        {
            loading ? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox variant="danger">{error}</MessageBox>
            : 
            (<form className="form" onSubmit={submitHandler}>
                <div>
                    <h2>Pago PSE</h2>
                </div>
                <div>
                    <label htmlFor="bank">Bank</label>
                    <select id="bank" onChange={e => setBank(e.target.value)}>
                        {
                            data.banks.map((item) => (
                                <option value={item.id}>{item.description}</option>
                            ))
                        }
                    </select>
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
                    <label htmlFor="typeClient">Type of client</label>

                    <select id="typeClient" onChange={e => setTypeClient(e.target.value)}>
                        <option value="N">Persona natural</option>
                        <option value="J">Persona juridica</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="typeIdentification">Type document</label>
                    <select id="typeClient" onChange={e => setTypeIdentification(e.target.value)}>
                        <option value="CC">Cédula de ciudadanía</option>
                        <option value="CE">Cédula de extranjería</option>
                        <option value="NIT">Número de Identificación Tributario</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="PP">Pasaporte</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="identification">Document</label>
                    <input
                        type="text"
                        id="identification"
                        placeholder="Enter number identification"
                        required
                        onChange={e => setIdentification(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="phone">Phone number</label>
                    <input
                        type="number"
                        id="phone"
                        placeholder="Enter Phone number"
                        required
                        onChange={e => setPhone(e.target.value)}
                    ></input>
                </div>
                <div>
                    {
                        loadingPse ? <LoadingBox></LoadingBox>
                        :
                        (
                            <>
                            <label />
                            <button className="primary" type="submit">Continue</button>
                            </>
                        )
                    }
    
                </div>
            </form>)
        }
        </div>
    )
}
