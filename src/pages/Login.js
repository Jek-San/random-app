import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { baseUrl } from "../shared";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loggedIn, setLoggedIn] = useContext(LoginContext)

  const location = useLocation()
  const navigate = useNavigate();


  function login(e) {
    e.preventDefault()
    const url = baseUrl + 'api/token/'
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })

    }).then((response) => {
      return response.json();
    }).then((data) => {
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      setLoggedIn(true)
      navigate(location?.state?.previousUrl
        ? location.state.previousUrl
        : '/customers'
      )

    }).catch((e) => { console.log(e) })
  }
  return (
    // <form
    //   className="w-full max-w-sm"
    //   // onSubmit={ }
    //   id='login'
    // >
    //   <div className="md:flex md:items-center mb-6">
    //     <div className="md:w-auto mr-5">
    //       <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"

    //         for="username">UserName</label>
    //     </div>
    //     <div className="md:w-3/3">
    //       <input className="bg-gray-200 appearance-none border-1 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
    //         id="username"
    //         type="text"
    //       // value={ }
    //       // onChange={(e) => { }}

    //       />
    //     </div>
    //   </div>
    //   <div className="md:flex md:items-center mb-6">
    //     <div className="md:w-auto">
    //       <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
    //         for='password'>Password</label>
    //     </div>
    //     <div className="md:w-3/3">
    //       <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
    //         id="password"
    //         type="password"
    //       // value={ }
    //       // onChange={(e) => {

    //       // }} 
    //       />

    //     </div>

    //   </div>
    // </form>
    <form onSubmit={(e) => {
      e.preventDefault()
    }}

      id="form" className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="username">
            UserName
          </label>
        </div>
        <div className="md:w-2/3">
          <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="name"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }} />
        </div>
      </div>


      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="password">
            Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="password" type="password" value={password} onChange={(e) => {
              setPassword(e.target.value)
            }} />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <button
          form="login"
          onClick={login} className='mr-10 p-3 bg-slate-400 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
        >
          Login
        </button>
        <button
          className='bg-slate-400 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
          <Link className='no-underline text-white ' to="/register">Sign Up</Link>
        </button>
      </div>
    </form>

  )
}