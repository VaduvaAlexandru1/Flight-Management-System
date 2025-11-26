import axios from 'axios'
import { useEffect , useState } from 'react'
import './App.css'

function App() {

  const [data , setData] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/auth/login");
        console.log(response.data)
        setData(response.data)
      }
      catch (error){
        console.log("there was an error fetching the data" , error)
      }
    }
    fetchData()
  } , [])
  return (
    <>
      {}
    </>
  )
}

export default App
