import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useFetch(url, method, headers, body) {
  const [data, setData] = useState()
  const [errorStatus, setErrorStatus] = useState()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    fetch(url, {
      method: method,
      headers: headers,
      body: body
    })
      .then((response) => {
        if (!response.ok) {
          throw (response.status)
        }
        if (response.status === 401) {

          navigate('/login', {
            state: {
              previousUrl: location.pathname,
            }
          })
        }

        return response.json()
      }).then((data) => {
        setData(data)
        console.log('console lognya:', data)
      }).catch((e) => {
        setErrorStatus(e)
      })
  }, [])
  return [data, errorStatus];
}