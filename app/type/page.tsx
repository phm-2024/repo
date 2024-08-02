'use client'
import React, { useState, useEffect, FormEvent } from 'react'

const QuizInputForm: React.FC = () => {
  const [inputText, setInputText] = useState<string>('')
  const [displayText, setDisplayText] = useState<string>('')
  const [quizVisible, setQuizVisible] = useState<boolean>(false)
  const [quizAnswer, setQuizAnswer] = useState<string>('')
  const [quizQuestion] = useState<string>('What is 2 + 2?')
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDisplayText(inputText)
    setInputText('')
  }

  const handleQuizSubmit = (e: FormEvent<HTMLFormElement>) => {
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
