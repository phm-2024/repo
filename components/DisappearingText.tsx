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
        // const letter = prev[0]
        // console.log(letter)
        aa(prev[0])
        return prev.slice(1)
      })
    }, interval)

    // Clean up the interval on component unmount
    return () => clearInterval(timer)
  }, [interval])
  function aa(prev) {
    console.log(prev)
  }

  return <div>{currentText}</div>
}

export default DisappearingText
