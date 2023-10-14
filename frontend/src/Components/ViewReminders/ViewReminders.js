import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ViewReminders = () => {

    const [getData, setData] = useState([]);
    console.log(getData);




    // GET API :

    const fetchData = () => {
        try {
            axios.get('http://localhost:8000/viewreminders/').then((res) => {
                setData(res.data);
            });
        } catch {
            alert('An error encountered while fetching the resources ');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    // DELETE API :

    const deleteHandle = (id) => {



        axios.delete(`http://localhost:8000/deletereminders/${id}`).then((res) => {
            alert('Reminder has been deleted from the list');
            fetchData();
        }).catch((err) => {
            alert('An error encountered while deleting the Reminder');
        });


    };


    return (

        <>
            <div className="viewProductSection" >
                <h2 style={{ textAlign: 'center', color: 'grey' }}>All REMINDERS </h2>
                <div className="createBtnContainer w-full text-center py-10">
                    <Link  className='createBtn bg-blue-600 text-white py-2 px-3 rounded-md ' to={'/createreminder'}>Create Reminder</Link>
                </div>
                <div className="viewProduct grid grid-cols-5 px-10">
                    {
                        getData.map((getValue) => {
                            return (

                                <div className="showData " key={getValue._id}>
                                    <div className='productTitle  view'> <h2>{getValue.title}</h2></div>
                                
                                
                                    <div className='productDescription view'>{getValue.description}</div>
                        
                                    <div className="btns">
                                        <Link className='editBtn  bg-indigo-500 py-1 px-3 rounded-md font-semibold text-white' to={`/editreminder/${getValue._id}`}>Edit</Link>
                                        <button className='delete bg-red-500 py-1 px-3 rounded-md font-semibold text-white' onClick={() => { deleteHandle(getValue._id) }}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ViewReminders;
