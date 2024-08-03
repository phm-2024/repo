'use client'

import { useState, useEffect } from 'react'

interface Props {
  text: string
  passedWord: boolean
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  currentIndex: number
}

const DisappearingText = ({
  text,
  passedWord,
  setCurrentIndex,
  currentIndex,
}: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setCurrentIndex(currentIndex + 1)
      }
    }, 1000)

    const restore = setTimeout(() => {
      if (currentIndex > text.length) {
        setCurrentIndex(text.length)
      }
    }, 100)

    return () => clearTimeout(timer)
    return () => clearTimeout(restore)
  }, [currentIndex, text])

  return (
    <div>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={
            index < currentIndex
              ? passedWord
                ? 'text-black'
                : 'text-white'
              : 'text-black'
          }
        >
          {char}
        </span>
      ))}
    </div>
  )
}

export default DisappearingText
