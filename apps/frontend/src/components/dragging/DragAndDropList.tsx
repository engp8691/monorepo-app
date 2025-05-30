import React, { useState } from 'react'

const initialItems = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']

export function DragAndDropList() {
  const [items, setItems] = useState(initialItems)
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDragIndex(index)
  }

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault() // Required to allow dropping
  }

  const handleDrop = (dropIndex: number) => {
    console.log(999918, dropIndex)
    if (dragIndex === null || dragIndex === dropIndex) return

    const newItems = [...items]
    const [movedItem] = newItems.splice(dragIndex, 1)
    newItems.splice(dropIndex, 0, movedItem)
    setItems(newItems)
    setDragIndex(null)
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <h2>🍇 Drag & Drop List</h2>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap' }}>
        {items.map((item, index) => (
          <li
            key={item}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            style={{
              padding: '8px 12px',
              margin: '4px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              cursor: 'grab',
              display: 'inline-block'
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
