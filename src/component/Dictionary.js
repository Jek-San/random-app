import { useEffect, useState } from "react"

function Dictionary() {
  const [word, setWord] = useState("")
  const [word2, setWord2] = useState("")

  useEffect(() => {
    console.log("useEffect has been used and have a state =", word)
  }, [word]
  )
  useEffect(() => {
    console.log("useEffect has been used and have a state =", word2)
  }, [word2]
  )
  return (
    <>
      <input onChange={(e) => {
        setWord(e.target.value)
      }} />
      <h1>Let's get the definition for {word}</h1>
      <input onChange={(e) => {
        setWord2(e.target.value)
      }} />
      <h1>Let's get the definition for {word2}</h1>
    </>
  )
}

export default Dictionary