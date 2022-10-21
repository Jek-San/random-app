import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Dictionary() {
  const [word, setWord] = useState("")

  useEffect(() => {
    console.log("useEffect has been used and have a state =", word)
  }, [word]
  )

  const navigate = useNavigate()

  return (
    <>
      <h1>Let's get the definition for {word}</h1>
      <input className="text-black" onChange={(e) => {
        setWord(e.target.value)
      }} />
      <button onClick={() => {

        navigate('/definition/' + word)
      }}>Search</button>

    </>
  )
}

export default Dictionary