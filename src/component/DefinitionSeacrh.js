import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function DefinitionSearch() {
  const [word, setWord] = useState("")

  useEffect(() => {
    console.log("useEffect has been used and have a state =", word)
  }, [word]
  )

  const navigate = useNavigate()

  return (
    <>
      <form
        className="flex justify-center space-x-2 max-w-[300px] "
        onSubmit={() => {

          navigate('/dictionary/' + word)
        }}>
        <input
          placeholder="Love"
          className="shrink min-w-0 px-2 text-black rounded"
          type="plan"
          onChange={(e) => {
            setWord(e.target.value)
          }} />
        <button
          className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Search</button>
      </form>

    </>
  )
}