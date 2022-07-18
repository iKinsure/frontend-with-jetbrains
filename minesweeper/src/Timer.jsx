import React, {useEffect, useState} from "react";

const Timer = () => {
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => setSeconds(seconds => seconds + 1), 1000)
        return () => clearTimeout(timer)
    }, [])

    const getMinutes = () => {
        return Math.floor(seconds / 60)
    }

    const getSeconds = () => {
        const secs = seconds % 60
        return secs < 10 ? `0${secs}` : String(secs)
    }

    return <p>{getMinutes()}:{getSeconds()}</p>
}

export default Timer