import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const ChatBox = () => {
    const [messages, setMessages] = useState<string[]>([])
    const boxRef = useRef<HTMLDivElement>(null)

    // Scroll to bottom before paint to avoid flicker
    useLayoutEffect(() => {
        boxRef.current?.scrollTo(0, boxRef.current.scrollHeight)
    }, [messages])

    //   useEffect(() => {
    //     boxRef.current?.scrollTo(0, boxRef.current.scrollHeight)
    //   }, [messages])

    const addMessage = () => {
        setMessages(prev => [...prev, `Message ${prev.length + 1}`])
    }

    return (
        <div>
            <div
                ref={boxRef}
                style={{
                    height: '200px',
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    padding: '10px',
                    marginBottom: '10px',
                }}
            >
                {messages.map((msg, i) => (
                    <div key={i}>{msg}</div>
                ))}
            </div>
            <button onClick={addMessage}>Add Message</button>
        </div>
    )
}

export default ChatBox