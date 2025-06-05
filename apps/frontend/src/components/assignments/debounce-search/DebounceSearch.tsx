import { ChangeEvent, useEffect, useState } from 'react'

const DebounceSearch = () => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(`Doing search for text ${search}`)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [search])
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value)
  }

  return <div style={{ padding: '1rem' }}>
    <label htmlFor="search">Search:</label>
    <input
      id="search"
      type="text"
      value={search}
      onChange={handleChange}
      placeholder="Type to search..."
      style={{ marginLeft: '8px', padding: '4px' }}
    />
  </div>
}

export default DebounceSearch