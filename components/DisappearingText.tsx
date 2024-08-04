'use client'

import { useState, useEffect } from 'react'

interface Props {
  text: string
  password: string
}

const DisappearingText = ({ text, password }: Props) => {
  const [passedWord, setPassedWord] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [useText, setUseText] = useState([[''], ['']])

  useEffect(() => {
    const check = text
      .split('')
      .filter((char, i) => i >= currentIndex)
      .join('')
    const found = check.match(password)
    found != null ? setPassedWord(true) : setPassedWord(false)

    const newText = whiteText()
    setUseText(newText)

    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setCurrentIndex(currentIndex + 1)
      }
    }, 500)

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
          ? textBody[1].push(char)
          : textBody[0].push(char)
        : textBody[1].push(char)
    })

    const whiteOut = textBody[0].join('').split('♡')
    const blackOut = textBody[1].join('').split('♡')
    return [[...whiteOut], [...blackOut]]
  }

  return (
    <span className="break-words w-[33rem]">
      <span className="text-amber-200">
        {useText[0].map((para, i) => (
          <>
            {i > 0 && <br />}
            {para}
          </>
        ))}
      </span>
      <span className="text-black break-words">
        {useText[1].map((para, i) => (
          <>
            {i > 0 && <br />}
            {para}
          </>
        ))}
      </span>
    </span>
  )
}

export default DisappearingText
