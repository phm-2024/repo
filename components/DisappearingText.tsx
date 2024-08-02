'use client'
import React, { useState, useEffect } from 'react'

interface DisappearingTextProps {
  text: string
  interval: number
}

const DisappearingText: React.FC<DisappearingTextProps> = ({
  text,
  interval,
}) => {
  const [currentText, setCurrentText] = useState<string>(text)

  useEffect(() => {
    // Set an interval to remove one character at a time
    const timer = setInterval(() => {
      setCurrentText((prev) => {
        if (prev.length === 0) {
          clearInterval(timer)
          return prev
        }
        return prev.slice(0, -1)
      })
    }, interval)

    // Clean up the interval on component unmount
    return () => clearInterval(timer)
  }, [interval])

  return <div>{currentText}</div>
}

export default DisappearingText
