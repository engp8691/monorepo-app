import { useEffect, useState, ChangeEvent } from 'react'

const LOCAL_STORAGE_KEY = 'notes-app'

const Note2LocalStorage = () => {
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState<string[]>([])

  // Load from localStorage on initial mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  // Save to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value)
  }

  const addNote = () => {
    if (note.trim() !== '') {
      setNotes(prev => [note, ...prev])
      setNote('')
    }
  }

  return (
    <div style={{ padding: '1rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2><span role="img" aria-label="Note">📝Notes</span></h2>
      <textarea
        rows={4}
        style={{ width: '100%', marginBottom: '8px' }}
        placeholder="Write a note..."
        value={note}
        onChange={handleChange}
      />
      <button onClick={addNote}>Add Note</button>
      <ul style={{ marginTop: '1rem' }}>
        {notes.map((n, idx) => (
          <li key={idx} style={{ marginBottom: '8px', background: '#f3f3f3', padding: '8px' }}>
            {n}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Note2LocalStorage
