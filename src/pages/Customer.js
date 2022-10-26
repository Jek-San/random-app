import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { baseUrl } from "../shared"

export default function Customer() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [customer, setCustomer] = useState()
  const [tempCustomer, setTempCustomer] = useState([])
  const [notFound, setNotFound] = useState()
  const [changed, setChanged] = useState(false)
  useEffect(() => {
    if (!customer) return
    if (!customer) return
    let equal = true;
    if (customer.name !== tempCustomer.name) {
      equal = false
    }
    if (customer.industry !== tempCustomer.industry) {
      equal = false
    }
    if (equal) {
      setChanged(false)
    }
  })

  useEffect(() => {
    const url = baseUrl + 'api/customers/' + id
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          // redirect to 404 page
          // navigate('/404')
          //render a 404 component
          setNotFound(true)
        }
        return response.json()
      })
      .then((data) => {
        setCustomer(data.customer)
        setTempCustomer(data.customer)
      })
  }, [])

  function updateCustomer() {
    const url = baseUrl + 'api/customers/' + id;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tempCustomer)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error
        }
        return response.json()

      })
      .then((data) => {
        setChanged(false)
        setCustomer(data.customer)
        console.log(data)
      })
      .catch((e) => { console.log(e) })
  }


  return (

    <>
      {notFound ? <h1> Customer dengan id: {id} tidak ditemukan </h1 > : null}
      {customer ?

        <div>
          <input
            className="block m-2 px-2 text-black"
            type="text"
            value={tempCustomer.name}
            onChange={(e) => {
              setChanged(true)
              setTempCustomer({
                ...tempCustomer,
                name: e.target.value
              })
            }}
          />
          <input
            className="block m-2 px-2 text-black"
            type="text"
            value={tempCustomer.industry}
            onChange={(e) => {
              setTempCustomer({
                ...tempCustomer,
                industry: e.target.value
              })
            }} />


          {/*Button to Delete  */}
          <button onClick={
            (e) => {
              const url = baseUrl + 'api/customers/' + customer.id
              fetch(url, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error('Somethin went wrong')
                  }
                  navigate('/customers')
                })
                .catch((e) => {
                  console.log(e)
                })
            }}
          >
            Delete
          </button>
          {changed ? (
            <>
              <button onClick={(e) => {
                setTempCustomer({ ...customer })
                setChanged(false)
              }}>Cancel</button>
              <button
                onClick={updateCustomer}>Save</button>
            </>
          ) : null}
          <br />
          <Link to='/customers'>Go back </Link>
        </div>


        : null}

    </>
  )
}