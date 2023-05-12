import { useEffect, useState } from 'react'

function App() {
  const [launches, setLaunches] = useState([])
  const [needRefresh, setNeedRefresh] = useState(false)

  const fetchData = async () => {
    /* fetch('https://api.spacexdata.com/v4/launches')
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log('Parsed response: ', data)
      })
      .catch(err => console.log(err)) */
    try {
      const response = await fetch('https://api.spacexdata.com/v4/launches')
      const parsed = await response.json()
      console.log(parsed)
      setLaunches(parsed)
      setNeedRefresh(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (needRefresh) {
      fetchData()
    }
  }, [needRefresh])

  return (
    <>
      <button type='button' onClick={() => setNeedRefresh(true)} disabled={needRefresh}>
        Refresh
      </button>
      {launches.map(launch => (
        <h2>Launch Succeeded: {launch.success ? 'Yes' : 'No'}</h2>
      ))}
    </>
  )
}

export default App
