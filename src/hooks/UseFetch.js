import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useFetch(url) {
  const [data, setData] = useState()
  const [errorStatus, setErrorStatus] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw (response.status)
        }
        else if (response.status === 401) {
          navigate('/login')
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