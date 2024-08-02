'use client'
import React, { useState, useEffect } from 'react'

const QuizInputForm = () => {
  const [inputText, setInputText] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [quizVisible, setQuizVisible] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState('')
  const [quizQuestion, setQuizQuestion] = useState('What is 2 + 2?')
  const correctAnswer = '4'

  useEffect(() => {
    if (displayText) {
      const timer = setTimeout(() => {
        setDisplayText('')
        setQuizVisible(true)
      }, 3000) // 1 minute = 60000 milliseconds

      return () => clearTimeout(timer)
    }
  }, [displayText])

  const handleSubmit = (e) => {
    e.preventDefault()
    setDisplayText(inputText)
    setInputText('')
  }

  const handleQuizSubmit = (e) => {
    e.preventDefault()
    if (quizAnswer === correctAnswer) {
      setDisplayText('Correct! Here is the content: ' + displayText)
      setQuizVisible(false)
      setQuizAnswer('')
    } else {
      setDisplayText('Incorrect! Try again.')
    }
  }

  return (
    <div>
      {!quizVisible ? (
        <form onSubmit={handleSubmit}>
          <label>
            Enter Text:
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <form onSubmit={handleQuizSubmit}>
          <p>{quizQuestion}</p>
          <label>
            Answer:
            <input
              type="text"
              value={quizAnswer}
              onChange={(e) => setQuizAnswer(e.target.value)}
            />
          </label>
          <button type="submit">Submit Answer</button>
        </form>
      )}
      <p>{displayText}</p>
    </div>
  )
}

export default QuizInputForm
