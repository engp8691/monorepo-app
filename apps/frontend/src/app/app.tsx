import { useEffect, useState } from 'react'

export function App() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('http://localhost:3000/greeting?username=John', {
      method: 'GET',
      credentials: 'include', // If using cookies
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  return (
    <div>
      <h1>React App with API Call</h1>
      {data ? (
        <div>
          <h2>{data.greeting}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default App
