import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';



const EditReminder = () => {


    const [getProduct, setProduct] = useState({
        title: '',
        description: '',
    });

    const changeHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setProduct({
            ...getProduct,
            [name]: value
        });
    };


    //--------------------------------------------------------------------------------




    // GET API for getting particular product data for prefilled form : -------------------------------------------------------

    const { id } = useParams();

    const getProductValue = () => {
        axios.get(`http://localhost:8000/products/${id}`).then((res) => {
            setProduct(res.data);
        }).catch((err) => {
            alert('An error encountered while fetching the resources - ' + err);
        })
    };

    useEffect(() => {
        getProductValue();
    }, []);

    //----------------------------------------------------------------------------------------------------





    // PATCH REQUEST For updating the Product : 



    const updateProduct = () => {
        axios.patch(`http://localhost:8000/updateReminder/${id}`, getProduct).then((res) => {
            alert('The Product has been updated ');
        }).catch((err) => {
            alert(`An error occurred while updating the product~${err}`);
        });

        setProduct({
            title: '',
            description: ''
        })
    };

    // ---------------------------------------------------------------------------------------------------


    return (

        <>
            <div className="formController" style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
                <form action="">
                    <h1 className='text-2xl font-semibold my-5 '>Edit Reminder</h1>
                    <div className="formContainer ">

                        <div className="sectionOne space-y-2">

                            <label htmlFor="">Reminder Title</label><br />
                            <input type="text" placeholder='Reminder Title' autoComplete='off' name='title' value={getProduct.title} onChange={changeHandle} className='py-2 w-80  px-2 border' required /> <br />

                            <label htmlFor="">Reminder Description</label><br />
                            <input type="text" placeholder='Reminder Description' className='py-2 border outline-none rounded-md px-2 w-80' autoComplete='off' name='description' value={getProduct.description} onChange={changeHandle} required /><br />

                        </div>

                        <div className="sectionTwo">


                            <button type='button' className='addBtn my-5 bg-blue-600 text-white font-semibold rounded-md py-2 px-5' onClick={updateProduct} >Update</button><br /><br />

                            <Link to={'/'} className='editBackButton bg-green-500 py-2 px-10 rounded-md' style={{ textDecoration: 'none', color: '#fff' }}>Back</Link>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default EditReminder;
