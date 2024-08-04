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
    console.log(newText)

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
          ? textBody[1].push(char)
          : textBody[0].push(char)
        : textBody[1].push(char)
    })

    const whiteOut = textBody[0].join('').split('/n')
    const blackOut = textBody[1].join('').split('/n')
    return [[...whiteOut], [...blackOut]]
  }

  return (
    <>
      <p style={{ color: 'white' }}>
        {useText[0].map((para) => (
          <>
            <p>{para}</p>
            <br />
          </>
        ))}
      </p>
      <p style={{ color: 'black' }}>
        {useText[1].map((para) => (
          <>
            <p>{para}</p>
            <br />
          </>
        ))}
      </p>
    </>
  )
}

export default DisappearingText
