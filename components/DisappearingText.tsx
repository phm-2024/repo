'use client'

import { useState, useEffect } from 'react'

interface Props {
  text: string
}

const DisappearingText = ({ text }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setCurrentIndex(currentIndex + 1)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [currentIndex])

  return (
    <div>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={index < currentIndex ? 'text-white' : 'text-black'}
          // style={{ color: index < currentIndex ? 'white' : 'black' }}
        >
          {char}
        </span>
      ))}
    </div>
  )
}

export default DisappearingText
