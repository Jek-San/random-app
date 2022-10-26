import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AddCustomer from "../component/AddCustomer"
import { baseUrl } from "../shared"

export default function Customers() {

  const [customers, setCustomers] = useState()
  const [show, setShow] = useState(false)

  function toggleShow() {
    setShow(!show);
  }


  useEffect(() => {
    console.log("Fetching")
    fetch(baseUrl + 'api/customers/')
      .then((response) => response.json()
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
      <ul>
        {customers ? customers.map((customer) => {
          return (
            <li key={customer.id}>
              <Link to={'/customers/' + customer.id}> {customer.name}</Link>
            </li>

          )


        }) : null}
      </ul>
      <AddCustomer
        newCustomer={newCustomer}
        show={show}
        toggleShow={toggleShow} />
    </>
  )
}