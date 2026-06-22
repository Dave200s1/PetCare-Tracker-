import { useState } from 'react'
import axios from 'axios'
import { NotebookText } from 'lucide-react'
import { scheduleNotification } from '../services/notificationHelper'
import { addToQueue } from '../services/offlineQueue'

function Note({ petId, taskDate }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('pflege')
  const [completed, setCompleted] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    if (!petId) {
      setMessage('Bitte wähle zuerst ein Haustier aus.')
      return
    }
    if (!title) {
      setMessage('Bitte Titel angeben.')
      return
    }
    if (!taskDate) {
      setMessage(
        'Bitte Datum/Uhrzeit über den Kalender oder Zeit-Button auswählen.'
      )
      return
    }

    const dueDateForReminder = new Date(taskDate)
    const dateForServer = dueDateForReminder.toISOString()

    setLoading(true)
    try {
      const taskData = {
        title,
        category,
        completed,
        date: dateForServer,
        petId,
      }

      if (navigator.onLine) {
        // Online: relativer Pfad
        const res = await axios.post('/api/task', taskData)
        setMessage(`Task "${title}" wurde angelegt (ID: ${res.data._id})`)

        const now = new Date()
        const diffSeconds = Math.floor((dueDateForReminder - now) / 1000)
        let reminderDelay = 60
        if (diffSeconds > 60) reminderDelay = diffSeconds - 60
        else if (diffSeconds > 0) reminderDelay = diffSeconds
        else reminderDelay = 0

        if (reminderDelay >= 0) {
          const minutes = Math.floor(reminderDelay / 60)
          scheduleNotification(
            `Erinnerung: ${title}`,
            `Der Task "${title}" ist in ${minutes} Minute(n) fällig für ${petId}.`,
            reminderDelay
          )
          setMessage(
            (prev) => prev + `  Erinnerung in ${minutes} Min. geplant.`
          )
        }
      } else {
        // Offline: in Queue legen
        await addToQueue('POST', '/api/task', taskData)
        setMessage(
          `Task "${title}" wurde offline gespeichert. Wird synchronisiert, sobald Sie wieder online sind.`
        )
      }

      setTitle('')
      setCategory('pflege')
      setCompleted(false)
    } catch (err) {
      console.error(err)
      setMessage('Fehler beim Speichern des Tasks.')
    } finally {
      setLoading(false)
    }
  }

  const formatDisplayDate = (date) => {
    if (!date) return 'Noch nicht ausgewählt'
    const d = new Date(date)
    return d.toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <>
      <style>{`
        .note-container { max-width: 400px; margin: 1rem auto; padding: 1rem; background: white; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .note-container form > p { display: flex; align-items: center; gap: 0.5rem; font-weight: bold; }
        .note-container label { display: block; margin-top: 0.5rem; font-weight: 600; }
        .note-container input, .note-container select { width: 100%; padding: 0.5rem; margin-top: 0.2rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 1rem; }
        .SaveBtn { background: #3b82f6; border: none; border-radius: 14px; padding: 0.7rem; color: white; font-weight: bold; cursor: pointer; width: 100%; margin-top: 1rem; }
        .SaveBtn:hover { background: #0e3169; }
        .SaveBtn:disabled { opacity: 0.6; cursor: not-allowed; }
        .message { text-align: center; margin-top: 0.5rem; font-size: 0.9rem; }
        .message.success { color: #16a34a; }
        .message.error { color: #dc2626; }
        .checkbox-group input { width: auto; }
        .date-display { background: #f3f4f6; padding: 0.5rem; border-radius: 0.5rem; margin-top: 0.2rem; font-size: 0.9rem; }
      `}</style>
      <div className="note-container">
        <form onSubmit={handleSubmit}>
          <p>
            <NotebookText size={20} /> <label>Neue Aufgabe</label>
          </p>

          <label htmlFor="title">Titel</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z.B. Hund spazieren gehen"
            required
          />

          <label htmlFor="category">Kategorie</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="pflege">Pflege</option>
            <option value="fütterung">Fütterung</option>
            <option value="spaziergang">Spaziergang</option>
            <option value="tierarzt">Tierarzt</option>
            <option value="sonstiges">Sonstiges</option>
          </select>

          <label>Ausgewähltes Datum</label>
          <div className="date-display">{formatDisplayDate(taskDate)}</div>

          <button type="submit" className="SaveBtn" disabled={loading}>
            {loading ? 'Wird gespeichert...' : 'Speichern'}
          </button>
        </form>
        {message && (
          <div
            className={`message ${message.includes('Fehler') ? 'error' : 'success'}`}
          >
            {message}
          </div>
        )}
      </div>
    </>
  )
}

export default Note
