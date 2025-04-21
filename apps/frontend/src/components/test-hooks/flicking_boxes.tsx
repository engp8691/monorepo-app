import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export function EffectResizeBox() {
    const boxRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(50)

    useEffect(() => {
        if (boxRef.current) {
            const boxHeight = boxRef.current.getBoundingClientRect().height
            if (boxHeight < 100) {
                setHeight(boxHeight + 50) // artificially grow it
            }
        }
    }, [height])

    return (
        <div
            ref={boxRef}
            style={{
                width: '200px',
                height: `${height}px`,
                backgroundColor: 'lightcoral',
                transition: 'height 0.2s',
                marginBottom: '10px',
                display: 'inline-block'
            }}
        >
            <p>This box measures itself and resizes useEffect.</p>
        </div>
    )
}


export function LayoutEffectResizeBox() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(50)

  useLayoutEffect(() => {
    if (boxRef.current) {
      const boxHeight = boxRef.current.getBoundingClientRect().height
      if (boxHeight < 100) {
        setHeight(boxHeight + 50) // resize before paint
      }
    }
  }, [height])

  return (
    <div
      ref={boxRef}
      style={{
        width: '200px',
        height: `${height}px`,
        backgroundColor: 'lightblue',
        transition: 'height 0.2s',
        marginBottom: '10px',
        display: 'inline-block'
      }}
    >
      <p>This box measures itself and resizes useLayoutEffect.</p>
    </div>
  )
}
