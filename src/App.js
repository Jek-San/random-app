import { createContext, useEffect, useState } from 'react';
import './index.css';
import Header from './component/Header';
import Employees from './pages/Employees';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom'
import Customers from './pages/Customers';
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition';
import NotFound from './component/NotFound';
import Customer from './pages/Customer';
import Login from './pages/Login';
import Register from './pages/Register';
import { baseUrl } from './shared';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profil';
import Homepage from './pages/Homepage';

export const LoginContext = createContext();
function App() {

  useEffect(() => {
    const minutes = 1000 * 60
    function refreshToken() {
      if (localStorage.refresh) {

        const url = baseUrl + 'api/token/refresh/'
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refresh: localStorage.refresh,
          }),
        })
          .then((response) => {
            return response.json()
          }).then((data) => {
            localStorage.access = data.access
            localStorage.refresh = data.refresh
            setLoggedIn(true)
          })
      }
    }
    refreshToken();
    setInterval(refreshToken, minutes * 10)
  }, [])
  useEffect(() => {
    setLoggedIn(false);
  }, [])


  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);
  function changeLoggedIn(value) {
    setLoggedIn(value)
    if (value === false) {
      localStorage.clear()
    }
  }
  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <HashRouter>
        <Header>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/profil' element={<Profile />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/employees' element={<Employees />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/customers/:id' element={<Customer />} />
            <Route path='/dictionary' element={<Dictionary />} />
            <Route path='/dictionary/:find' element={<Definition />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Header>
      </HashRouter>
    </LoginContext.Provider>
  )
}

export default App;
