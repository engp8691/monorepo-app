import { useRef } from 'react'

export default function ScrollAndCount() {
    const boxRef = useRef<HTMLDivElement>(null)   // DOM access
    const clickCount = useRef(0)                  // Mutable value storage

    const handleClick = () => {
        clickCount.current++
        console.log(`Clicked ${clickCount.current} times`)

        // Scroll into view
        boxRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div style={{ height: '200vh', padding: '20px' }}>
            <button onClick={handleClick}>Scroll to Box & Count Click</button>

            <div style={{ height: '150vh' }} />

            <div
                ref={boxRef}
                style={{
                    height: '100px',
                    backgroundColor: 'skyblue',
                    textAlign: 'center',
                    lineHeight: '100px',
                    fontSize: '20px',
                }}
            >
                Scroll Target Box
            </div>
        </div>
    )
}
