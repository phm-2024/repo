'use client'
import React, { useState, useEffect, useRef } from 'react'

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

        addText(prev[0])
        return prev.slice(1)
      })
    }, interval)

    // Clean up the interval on component unmount
    return () => clearInterval(timer)
  }, [interval])

  const [bgText, setBgText] = useState('')

  function addText(letter: string) {
    setBgText((prev) => {
      return (prev += letter)
    })
  }

  return (
    <div>
      {currentText}, {bgText}
    </div>
  )
}

export default DisappearingText
