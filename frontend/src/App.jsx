
import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  async function saveName(e) {
    e.preventDefault()
    setMessage('Saving user...')

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save user')
      }

      setMessage(`User saved successfully: ${data.user.name}`)
      setName('')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div className="container">
      <h1>Full Stack CI/CD Project</h1>
      <p>React + Node.js + MongoDB + Docker + AWS</p>

      <form onSubmit={saveName}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <button type="submit">Save User</button>
      </form>

      {message && <h3>{message}</h3>}
    </div>
  )
}

export default App
