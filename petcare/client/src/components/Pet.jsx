import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Pet({ onPetSelected }) {
  const [pets, setPets] = useState([])
  const [selectedPetId, setSelectedPetId] = useState('')
  const [mode, setMode] = useState('existing')
  const [newPet, setNewPet] = useState({ name: '', type: '', age: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Lade Haustiere – relativer Pfad
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get('/api/pet')
        setPets(res.data)
        if (res.data.length > 0) {
          setSelectedPetId(res.data[0]._id)
          if (onPetSelected) onPetSelected(res.data[0]._id)
        }
      } catch (err) {
        console.error('Fehler beim Laden der Haustiere:', err)
      }
    }
    fetchPets()
  }, [])

  const handleChange = (e) => {
    const id = e.target.value
    setSelectedPetId(id)
    if (onPetSelected) onPetSelected(id)
  }

  const handleModeChange = (newMode) => {
    setMode(newMode)
    setMessage('')
  }

  const handleNewPetChange = (e) => {
    setNewPet({ ...newPet, [e.target.name]: e.target.value })
  }

  const handleCreatePet = async (e) => {
    e.preventDefault()
    if (!newPet.name || !newPet.type || !newPet.age) {
      setMessage('Bitte fülle alle Felder aus.')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post('/api/pet', {
        name: newPet.name,
        type: newPet.type,
        age: parseInt(newPet.age, 10),
      })
      setMessage(`Haustier "${newPet.name}" angelegt (ID: ${res.data._id})`)
      // Aktualisiere die Liste
      setPets([...pets, res.data])
      setSelectedPetId(res.data._id)
      if (onPetSelected) onPetSelected(res.data._id)
      setNewPet({ name: '', type: '', age: '' })
      setMode('existing')
    } catch (err) {
      setMessage('Fehler beim Anlegen.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Styles
  const styles = `
    .pet-container {
      margin: 1rem 0;
      padding: 1rem;
      background: white;
      border-radius: 1rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .pet-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .pet-header label {
      font-weight: 600;
    }
    .mode-toggle {
      display: flex;
      gap: 0.5rem;
    }
    .mode-btn {
      padding: 0.2rem 0.8rem;
      border: none;
      border-radius: 1rem;
      cursor: pointer;
      font-size: 0.8rem;
      background: #e5e7eb;
      color: #374151;
    }
    .mode-btn.active {
      background: #3b82f6;
      color: white;
    }
    .pet-select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      margin-top: 0.3rem;
    }
    .new-pet-form {
      margin-top: 0.5rem;
    }
    .new-pet-form input {
      width: 100%;
      padding: 0.4rem;
      margin: 0.2rem 0;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
    }
    .new-pet-form button {
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 1rem;
      padding: 0.4rem 1rem;
      cursor: pointer;
      margin-top: 0.3rem;
    }
    .message {
      font-size: 0.8rem;
      margin-top: 0.3rem;
    }
    .message.success { color: #16a34a; }
    .message.error { color: #dc2626; }
  `

  return (
    <div className="pet-container">
      <style>{styles}</style>
      <div className="pet-header">
        <label htmlFor="petSelect">Haustier</label>
        <div className="mode-toggle">
          <button
            className={`mode-btn ${mode === 'existing' ? 'active' : ''}`}
            onClick={() => handleModeChange('existing')}
          >
            Auswählen
          </button>
          <button
            className={`mode-btn ${mode === 'new' ? 'active' : ''}`}
            onClick={() => handleModeChange('new')}
          >
            Neu
          </button>
        </div>
      </div>

      {mode === 'existing' && (
        <select
          id="petSelect"
          className="pet-select"
          value={selectedPetId}
          onChange={handleChange}
        >
          {pets.map((pet) => (
            <option key={pet._id} value={pet._id}>
              {pet.name} ({pet.type}, {pet.age} Jahre)
            </option>
          ))}
        </select>
      )}

      {mode === 'new' && (
        <form className="new-pet-form" onSubmit={handleCreatePet}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newPet.name}
            onChange={handleNewPetChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Art (z.B. Hund)"
            value={newPet.type}
            onChange={handleNewPetChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Alter (Jahre)"
            value={newPet.age}
            onChange={handleNewPetChange}
            min="0"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Wird angelegt...' : 'Anlegen'}
          </button>
        </form>
      )}

      {message && (
        <div
          className={`message ${message.includes('Fehler') ? 'error' : 'success'}`}
        >
          {message}
        </div>
      )}
    </div>
  )
}

export default Pet
