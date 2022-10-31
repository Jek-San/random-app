import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { baseUrl } from "../shared";

export default function Register() {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loggedIn, setLoggedIn] = useContext(LoginContext)

  const location = useLocation()
  const navigate = useNavigate();


  function login(e) {
    e.preventDefault()
    const url = baseUrl + 'api/register/'
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
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

    <form onSubmit={(e) => {
      e.preventDefault()
    }}

      id="form" className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="email">
            Email
          </label>
        </div>
        <div className="md:w-2/3">
          <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }} />
        </div>
      </div>
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
          onClick={login} className='bg-slate-400 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
        >
          Register
        </button>
      </div>
    </form>

  )
}