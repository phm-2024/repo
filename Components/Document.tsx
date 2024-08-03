import { useEffect, useState } from 'react'

export default function Document() {
  let char = 0

  useEffect(() => {
    setTimeout(() => {}, 1000)
  }, [charCount])

  const [charCount, setCharCount] = useState(-1)
  const [onText, setOnText] = useState('')

  function expireText(e: any) {
    setOnText(e.target.value)
    setCharCount(charCount + 1)
  }

  return (
    <>
      <p style={{ color: 'red' }}>{offText}</p>
      <input value={onText} onChange={expireText} />
    </>
  )
}
