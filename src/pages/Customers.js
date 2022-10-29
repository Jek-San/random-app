
import { useEffect, useState, useContext } from "react"
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AddCustomer from "../component/AddCustomer"
import { baseUrl } from "../shared"
import { LoginContext } from "../App"

export default function Customers() {

  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const location = useLocation();
  const [customers, setCustomers] = useState()
  const [show, setShow] = useState(false)
  const navigate = useNavigate()



  function toggleShow() {
    setShow(!show);
  }


  useEffect(() => {
    const url = baseUrl + 'api/customers/'
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      }
    })
      .then((response) => {
        if (response.status === 401) {
          setLoggedIn(false)
          navigate('/login', {
            state: {
              previousUrl: location.pathname,
            }
          })
        }
        return response.json()
      }
      )
      .then((data) => {
        setCustomers(data.customers)
      })

  }, [])


  function newCustomer(name, industry) {
    const data = { name: name, industry: industry }
    const url = baseUrl + 'api/customers/'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Somthing went wrong')
        }
        return response.json();
      })
      .then((data) => {

        toggleShow()
        setCustomers([...customers, data.customer])
      })
      .catch((e) => {
        console.log(e)

      })

  }

  return (
    <>
      <h1>Here are our Customers</h1>

      {customers ? customers.map((customer) => {
        return (
          <div
            className="m-2"
            key={customer.id} >
            <Link to={'/customers/' + customer.id}>
              <button
                className="min-w-[200px] bg-purple-400 hover:bg-purple-700 text-white font-bold mr-2 py-2 px-4 rounded"
              >{customer.name}</button>

            </Link>
          </div>
        );
      })
        : null}
      <div className="ml-2 min-w-500px ">
        <AddCustomer
          newCustomer={newCustomer}
          show={show}
          toggleShow={toggleShow} />
      </div>
    </>
  )
}