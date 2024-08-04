'use client'

import { useState, useEffect } from 'react'

interface Props {
  text: string
  password: string
}

const DisappearingText = ({ text, password }: Props) => {
  const [passedWord, setPassedWord] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const check = text
      .split('')
      .filter((char, i) => i >= currentIndex)
      .join('')
    const found = check.match(password)
    found != null ? setPassedWord(true) : setPassedWord(false)

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

    return () => {
      clearTimeout(timer)
      clearTimeout(restore)
    }
  }, [currentIndex, text])

  function whiteText() {
    const textBody = [[], []]
    text.split('').map((char, i) => {
      i < currentIndex
        ? passedWord
          ? textBody[1].push()
          : textBody[0].push()
        : textBody[1].push()
    })
    return textBody
  }

  return (
    <>
      {text.split('/n').map((para) => (
        <p>
          {para.split('').map((char, index) => (
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
        </p>
      ))}
    </>
  )
}

export default DisappearingText
