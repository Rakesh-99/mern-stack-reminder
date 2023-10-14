import { useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {

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
    console.log(signupUserData);
  }


  return (


    <>
      <div className="flex w-full h-screen justify-center items-center">
        <form action="" className="flex flex-col w-96 space-y-3 " onSubmit={submitHandle}>

          <h1 className="text-2xl font-semibold">Login User</h1>



          <input type="text" placeholder="Enter email" name="email" onChange={inputChangeHandle} className="border  py-2 px-3 outline-none" autoComplete="off" />

          <input type="password" className="border  py-2 px-3 outline-none" placeholder="Enter Password" name="password"  onChange={inputChangeHandle} />

          <button className="bg-indigo-500 text-white font-semibold py-2 rounded-md">Register</button>

          <div className="">
            <p>Do not have an account? <span className="text-blue-700 active:underline cursor-pointer font-semibold"><Link to={'/signup'}>Signup</Link></span></p>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
