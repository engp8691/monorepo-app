import React from 'react'
import { useViewportSize, useVirtualList } from '../../hooks'

const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)

export const VirtualList: React.FC = () => {
  const size = useViewportSize()
  const { containerRef, visibleItems, offsetY, totalHeight } = useVirtualList({
    items,
    itemHeight: 30,
    containerHeight: size.height - 80,
  })

  const btm = totalHeight - offsetY < (visibleItems.length + 4) * 30 ? true : false
  return (
    <div
      ref={containerRef}
      style={{
        height: `${size.height - 80}px`,
        overflowY: 'auto',
        border: '1px solid #ccc',
        position: 'relative',
      }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, i) => (
            <div
              key={offsetY + i}
              style={{
                height: 30,
                borderBottom: '1px solid #eee',
                padding: '0 8px',
                boxSizing: 'border-box',
              }}
            >
              {item}
            </div>
          ))}
          {btm && <div style={{ height: '40px' }}></div>}
        </div>
      </div>
    </div>
  )
}
