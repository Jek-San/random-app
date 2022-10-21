import { useEffect, useState } from "react"

export default function Definition() {

  const [word, setWord] = useState([]);


  useEffect(() => {
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/helicopter')
      .then((response) => response.json())
      .then((data) => {
        setWord(data[0].meanings);
        console.log(data[0].meanings);

      });
  }, []);

  return (
    <>
      <h1>Here is a Definition Page:</h1>


      {word.map((meaning) => {
        return (
          <p>
            {meaning.partOfSpeech + ' '}:
            {meaning.definitions[0].definition}</p>
        )



      })}
    </>
  );
}