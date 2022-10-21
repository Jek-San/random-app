import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom";
import NotFound from "../component/NotFound";

export default function Definition() {

  const [word, setWord] = useState();
  const [notFound, setNotfound] = useState(false)

  const navigate = useNavigate()
  let { find } = useParams()

  useEffect(() => {
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + find)
      .then((response) => {
        if (response.status === 404) {
          setNotfound(true)

        }
        return response.json()
      })
      .then((data) => {
        setWord(data[0].meanings);
        console.log(data[0].meanings);

      });
  }, []);

  if (notFound === true) {
    return (<>
      <h1>The word you looking was not found </h1>
      <Link to="/dictionary">Search Another word</Link>

    </>
    )
  }

  return (
    <>
      {word ? (
        <>
          <h1>Here is a Definition Page:</h1>
          {word.map((meaning, i) => {
            return (
              <p key={i}>
                {meaning.partOfSpeech + ' '}:
                {meaning.definitions[0].definition}
              </p>
            );
          })}
        </>
      ) : null}
    </>
  )
}