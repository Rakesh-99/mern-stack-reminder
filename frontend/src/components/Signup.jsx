import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {

    const [signupError, setSignUpError] = useState();

    const [signupUserData, setSignupUserData] = useState({

        username: '',
        email: '',
        password: '',
        gender: '',

    })


    const inputChangeHandle = (e) => {

        const { name, value } = e.target;
        setSignupUserData({ ...signupUserData, [name]: value });

    };

    const submitHandle = (e) => {

        e.preventDefault();
        validateUser(signupUserData);
    }




    const validateUser = (values) => {

        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (
            !values.username ||
            values.username.length < 2 ||
            values.username.length > 30
        ) {
            toast.error('Username should be between 2 to 30 char')

            return false
        }

        if (!values.email) {
            toast.error('Email filed is required')
            return false
        } else if (!regEx.test(values.email)) {
            toast.error('Invalid email')
            return false
        }

        if (!values.password) {
            toast.error('Password can not be empty')
            return false
        } else if (values.password.length < 6) {
            toast.error('Password can not be less than 6 char')
            return false
        } else {
            
        }
    }

    return (


        <>
            <div className="flex w-full h-screen justify-center items-center">
                <form action="" className="flex flex-col w-96 space-y-3 " onSubmit={submitHandle}>
                    <ToastContainer />
                    <h1 className="text-2xl font-semibold">Register User</h1>

                    {/* username  */}
                    <input type="text" placeholder="Enter Username" name="username" onChange={inputChangeHandle} className="border py-2 px-3 outline-none" autoComplete="off" />

                    {/* Email  */}
                    <input type="text" placeholder="Enter email" name="email" onChange={inputChangeHandle} className="border  py-2 px-3 outline-none" autoComplete="off" />

                    {/* Gender  */}
                    <div className="flex space-x-2">
                        <input type="radio" placeholder="" value='male' name="gender" onChange={inputChangeHandle} required />
                        <label htmlFor="">Male</label>
                        <input type="radio" placeholder="" value='female' name="gender" onChange={inputChangeHandle} className="border py-2 px-3 outline-none" required />
                        <label htmlFor="">Female</label>
                    </div>

                    {/* Password  */}
                    <input type="password" className="border  py-2 px-3 outline-none" placeholder="Enter Password" name="password" onChange={inputChangeHandle} />

                    <button className="bg-indigo-500 text-white font-semibold py-2 rounded-md">Register</button>

                    <div className="">
                        <p>Already have an account? <span className="text-blue-700 active:underline cursor-pointer font-semibold"><Link to={'/login'}>Login</Link></span></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup
