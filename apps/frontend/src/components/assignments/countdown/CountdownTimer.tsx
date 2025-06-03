import { useEffect, useState } from 'react'

const CountDownTimer = () => {
  const [seconds, setSeconds] = useState(60)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    let timer: number | NodeJS.Timeout | undefined
    if (!paused) {
      timer = setTimeout(() => {
        setSeconds(prev => prev > 0 ? prev - 1 : 0)

      }, 1000)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }

  }, [seconds, paused])

  return (<div>
    <div>{seconds}</div>
    <button disabled={!paused} onClick={() => {
      setPaused(false)
    }}>Start</button>
    <button style={{ margin: '10px' }} disabled={paused} onClick={() => {
      setPaused(true)
    }}>Pause</button>
    <button onClick={() => {
      setSeconds(60)
    }}>Reset</button>
  </div>)

}

export default CountDownTimer