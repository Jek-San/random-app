import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { baseUrl } from "../shared"

export default function Customer() {
  const navigate = useNavigate()
  const location = useLocation();
  const { id } = useParams()
  const [customer, setCustomer] = useState()
  const [tempCustomer, setTempCustomer] = useState([])
  const [notFound, setNotFound] = useState()
  const [changed, setChanged] = useState(false)
  const [error, setError] = useState()
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
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something Went Wrong')
        }
        if (response.status === 404) {
          // redirect to 404 page
          // navigate('/404')
          //render a 404 component
          setNotFound(true)
        }
        else if (response.status === 401) {
          navigate('/login', {
            state: {
              previousUrl: location.pathname,
            }
          })
        }
        return response.json()
      })
      .then((data) => {
        setCustomer(data.customer)
        setTempCustomer(data.customer)
        setError(undefined)
      })
      .catch((e) => {
        setError(e.message)
      })
  }, [])

  function updateCustomer(e) {
    e.preventDefault();
    const url = baseUrl + 'api/customers/' + id;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      },
      body: JSON.stringify(tempCustomer)
    })
      .then((response) => {
        console.log('response', response)
        if (response.status === 401) {
          navigate('/login', {
            state: {
              previousUrl: location.pathname,
            }
          })
        }
        if (!response.ok) {
          throw new Error('Somthing went wrong')
        }
        return response.json()

      })
      .then((data) => {
        setChanged(false)
        setCustomer(data.customer)
        console.log(data)
        setError(undefined)
      })
      .catch((e) => {
        console.log(e)
        setError(e.message)
      })
  }


  return (

    <>
      {notFound ? <h1> Customer dengan id: {id} tidak ditemukan </h1 > : null}
      {customer ?

        <div
          className="mt-2">
          <form
            className="w-full max-w-sm"
            onSubmit={updateCustomer}
            id='customer'
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-auto mr-5">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"

                  for="name">Name</label>
              </div>
              <div className="md:w-3/3">
                <input className="bg-gray-200 appearance-none border-1 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
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
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-auto">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for='industry'>Industry</label>
              </div>
              <div className="md:w-3/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="industry"
                  type="text"
                  value={tempCustomer.industry}
                  onChange={(e) => {
                    setTempCustomer({
                      ...tempCustomer,
                      industry: e.target.value
                    })
                  }} />
              </div>

            </div>
          </form>


          {/*Button to Delete  */}

          <button
            className='bg-slate-400 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
            onClick={
              (e) => {
                const url = baseUrl + 'api/customers/' + id
                fetch(url, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access'),
                  },
                })
                  .then((response) => {
                    if (response.status === 401) {
                      navigate('/login', {
                        state: {
                          previousUrl: location.pathname,
                        }
                      })
                    }
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
          {/* Button Save and Cancel */}
          {changed ? (
            <div
              className="mt-2">
              <button
                className='bg-purple-400 hover:bg-purple-700 text-white font-bold mr-2 py-2 px-4 rounded'
                onClick={(e) => {
                  setTempCustomer({ ...customer })
                  setChanged(false)
                }}>Cancel</button>
              <button
                className='bg-purple-400 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                form="customer"
              >Save</button>
            </div>
          ) : null}
          <br />
          <div
            className='max-w-[250px]  bg-purple-400 mt-2 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded '
          >
            <Link
              className="no-underline justify-center text-center"
              to='/customers'>Go back </Link>
          </div>
        </div>


        : null}
      {error ? <p>{error}
        <Link to='/customers'>Go back </Link>
      </p> : null}


    </>
  )
}