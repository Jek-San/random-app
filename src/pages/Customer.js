import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function Customer() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [customer, setCustomer] = useState()
  const [notFound, setNotFound] = useState()
  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/customers/"
    fetch(url + id)
      .then((response) => {
        if (response.status === 404) {
          // redirect to 404 page
          // navigate('/404')
          //render a 404 component
          setNotFound(true)
        }
        return response.json()
      })
      .then((data) => { setCustomer(data.customer) })
  }, [])


  return (

    <>
      {notFound ? <h1> Customer dengan id: {id} tidak ditemukan </h1 > : null}
      {customer ?

        <div>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.industry}</p>

        </div>


        : null}
      <Link to='/customers'>Go back </Link>

    </>
  )
}