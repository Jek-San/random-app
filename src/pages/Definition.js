import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom";
import DefinitionSearch from "../component/DefinitionSeacrh";
import NotFound from "../component/NotFound";
import useFetch from "../hooks/UseFetch";

export default function Definition() {

  // const [word, setWord] = useState();
  // const [notFound, setNotfound] = useState(false)

  const navigate = useNavigate()
  let { find } = useParams()

  // const [error, setError] = useState(false)

  const { data: [{ meanings: word }] = [{}], errorStatus } = useFetch(
    'https://api.dictionaryapi.dev/api/v2/entries/en/' + find
  )

  useEffect(() => {
    console.log(word)
  })

  // useEffect(() => {
  //   // const url = 'https://httpstat.us/500'
  //   const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
  //   fetch(url + find)
  //     .then((response) => {
  //       // console.log(response.status)
  //       if (response.status === 404) {
  //         setNotfound(true)

  //       } else if (response.status === 401) {
  //         navigate('/login')
  //       } else if (response.status === 500) {
  //         // setServerError(true)
  //       }
  //       console.log(response.ok)
  //       if (!response.ok) {
  //         setError(true);
  //       }
  //       return response.json()
  //     })
  //     .then((data) => {
  //       setWord(data[0].meanings);
  //       // console.log(data[0].meanings);

  //     })
  //     .catch((e) => {
  //       console.log(e.message)
  //     })
  // }, []);


  if (errorStatus === 401) {
    return (<>
      <h1>The word you looking was not found </h1>
      <DefinitionSearch className="flex justify-center" />
      <Link to="/dictionary">Search Another word</Link>

    </>
    )
  }
  if (errorStatus) {
    return (<>
      <h1>Something when wrong tryAgain </h1>
      <Link to="/dictionary">Search Another word</Link>

    </>
    )
  }

  return (
    <>
      {word ? (
        <>
          <h1>Here is a Definition Page of : </h1>
          {word.map((meaning, i) => {
            return (
              <p key={i}>
                {meaning.partOfSpeech + ' '}:
                {meaning.definitions[0].definition}
              </p>

            );
          })}
          <DefinitionSearch className="flex justify-center" />
        </>
      ) : null}


    </>
  )
} 