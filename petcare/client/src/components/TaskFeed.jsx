import { useEffect, useState } from 'react'
import {
  Footprints,
  Utensils,
  HeartPlus,
  ClipboardList,
  Trash2,
} from 'lucide-react'
import { addToQueue } from '../services/offlineQueue'

function TaskFeed() {
  const [tasks, setTasks] = useState([])
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all') // 'all', 'open', 'done'
  const [error, setError] = useState(null)

  const getPetName = (petId) => {
    if (!petId) return 'Kein Haustier'
    const pet = pets.find(p => p._id === petId || p.id === petId)
    return pet ? pet.name : petId
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskRes = await fetch('/api/task')
        if (!taskRes.ok) throw new Error(`HTTP ${taskRes.status}`)
        const taskData = await taskRes.json()
        console.log('Tasks geladen (roh):', taskData)

        const tasksWithId = taskData.map(task => ({
          ...task,
          id: task.id || task._id
        }))

        const uniqueTasks = tasksWithId.filter((task, index, self) =>
          index === self.findIndex(t => t.id === task.id)
        )
        setTasks(uniqueTasks)
        console.log('Tasks mit ID:', uniqueTasks.map(t => ({ id: t.id, title: t.title })))

        let petData = []
        try {
          const petRes = await fetch('/api/pet')
          if (petRes.ok) {
            petData = await petRes.json()
            petData = petData.map(pet => ({ ...pet, id: pet.id || pet._id }))
          } else {
            const localRes = await fetch('/meta_data/pets.json')
            if (localRes.ok) {
              const json = await localRes.json()
              petData = (json.pets || []).map(pet => ({ ...pet, id: pet.id || pet._id }))
            }
          }
        } catch (petErr) {
          console.warn('Pets konnten nicht geladen werden:', petErr)
        }
        setPets(petData)
        setError(null)
      } catch (err) {
        console.error('Fehler beim Laden:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getTaskIcon = (title) => {
    const lower = title.toLowerCase()
    if (lower.includes('gassie') || lower.includes('spazier'))
      return <Footprints size={18} color="#3b82f6" />
    if (lower.includes('fütter') || lower.includes('essen'))
      return <Utensils size={18} color="#f59e0b" />
    if (lower.includes('gesund') || lower.includes('arzt'))
      return <HeartPlus size={18} color="#ef4444" />
    return <ClipboardList size={18} color="#6b7280" />
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const formatDateTime = (dateStr) => {
    if (!dateStr) return 'Keine Uhrzeit'
    const d = new Date(dateStr)
    if (isNaN(d)) return dateStr
    const hasTime = d.getHours() !== 0 || d.getMinutes() !== 0
    const datePart = d.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    if (hasTime) {
      const timePart = d.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
      })
      return `${datePart}, ${timePart} Uhr`
    }
    return datePart
  }

  const updateTask = async (taskId, updatedFields) => {
    if (!taskId) {
      console.error('updateTask: Keine gültige Task-ID')
      return
    }
    console.log(`Update Task ${taskId} mit:`, updatedFields)

    if (navigator.onLine) {
      try {
        const res = await fetch(`/api/task/${taskId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFields),
        })
        if (!res.ok) {
          const errText = await res.text()
          throw new Error(`Update fehlgeschlagen: ${res.status} ${errText}`)
        }
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, ...updatedFields } : t))
        )
        console.log('Task aktualisiert')
      } catch (err) {
        console.error('Update Error:', err)
        alert('Fehler beim Aktualisieren des Tasks.')
      }
    } else {
      await addToQueue('PUT', `/api/task/${taskId}`, updatedFields)
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, ...updatedFields } : t))
      )
      alert('Änderung wurde offline gespeichert und wird später synchronisiert.')
    }
  }

  const deleteTask = async (taskId) => {
    console.log('deleteTask aufgerufen mit taskId:', taskId)

    if (!taskId) {
      console.error('deleteTask: Keine gültige Task-ID')
      return
    }

    const taskExists = tasks.some(t => t.id === taskId)
    console.log('taskExists:', taskExists, 'aktuelle IDs:', tasks.map(t => t.id))

    if (!taskExists) {
      console.warn('Die zu löschende Task-ID wurde im State nicht gefunden.')
      return
    }

    if (!window.confirm('Task wirklich löschen?')) return

    if (navigator.onLine) {
      try {
        const res = await fetch(`/api/task/delete/${taskId}`, {
          method: 'DELETE',
        })
        if (!res.ok) {
          const errText = await res.text()
          throw new Error(`Löschen fehlgeschlagen: ${res.status} ${errText}`)
        }

        setTasks((prev) => {
          const filtered = prev.filter((t) => t.id !== taskId)
          console.log('Anzahl Tasks nach Filter:', filtered.length)
          return filtered
        })
        console.log('Task gelöscht (Frontend-Update)')
      } catch (err) {
        console.error('Delete Error:', err)
        alert('Fehler beim Löschen des Tasks.')
      }
    } else {
      await addToQueue('DELETE', `/api/task/delete/${taskId}`, null)
      setTasks((prev) => prev.filter((t) => t.id !== taskId))
      alert('Task wurde offline gelöscht und wird später synchronisiert.')
    }
  }

  const handleCompletedChange = (task, e) => {
    const completed = e.target.checked
    updateTask(task.id, { completed })
  }

  // Gefilterte Tasks mit Kategorie- und Status-Filter
  const filteredTasks = tasks.filter((task) => {
    // Kategorie-Filter
    if (filter !== 'all' && task.category !== filter) return false

    // Status-Filter
    if (statusFilter === 'open' && task.completed) return false
    if (statusFilter === 'done' && !task.completed) return false

    return true
  })

  // Zählung für die Status-Anzeige
  const openCount = tasks.filter(t => !t.completed).length
  const doneCount = tasks.filter(t => t.completed).length

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Lade Aufgaben...</div>
  }
if (error) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
      Fehler beim Laden: {error}
    </div>
  )
}

  return (
    <>
      <style>{`
        .task-feed { max-width: 600px; margin: 0 auto; padding: 1rem; }
        .task-feed h3 { margin-bottom: 0.5rem; }

        .filter-bar {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.8rem;
          flex-wrap: wrap;
        }
        .filter-bar button {
          padding: 0.3rem 1.2rem;
          border: 1px solid #d1d5db;
          border-radius: 999px;
          background: #f3f4f6;
          color: #374151;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          font-size: 0.85rem;
        }
        .filter-bar button:hover { background: #e5e7eb; }
        .filter-bar button.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .status-filter-bar {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.8rem;
        }
        .status-filter-bar button {
          padding: 0.25rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 999px;
          background: #f9fafb;
          color: #374151;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          font-size: 0.8rem;
        }
        .status-filter-bar button:hover { background: #e5e7eb; }
        .status-filter-bar button.active {
          background: #000000;
          color: white;
          border-color: #6b7280;
        }
        .status-filter-bar button.active.open { background: #f59e0b; border-color: #f59e0b; }
        .status-filter-bar button.active.done { background: #10b981; border-color: #10b981; }
        .status-filter-bar .count-badge {
          font-size: 0.7rem;
          padding: 0.05rem 0.5rem;
          border-radius: 999px;
          margin-left: 0.2rem;
        }

        .task-accordion {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          margin-bottom: 0.75rem;
          overflow: hidden;
        }
        .task-accordion:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .task-accordion.completed-task {
          opacity: 0.7;
          background: #f9fafb;
        }
        .task-accordion.completed-task summary .task-title {
          text-decoration: line-through;
          color: #6b7280;
        }
        .task-accordion summary {
          display: flex;
          align-items: center;
          padding: 0.8rem 1rem;
          cursor: pointer;
          list-style: none;
          gap: 0.8rem;
          font-weight: 500;
        }
        .task-accordion summary::-webkit-details-marker { display: none; }
        .task-accordion summary .task-icon { flex-shrink: 0; }
        .task-accordion summary .task-info { flex: 1; display: flex; flex-direction: column; gap: 0.2rem; }
        .task-accordion summary .task-title { font-weight: 600; }
        .task-accordion summary .task-meta {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.8rem;
          color: #6b7280;
          flex-wrap: wrap;
        }
        .task-accordion summary .task-meta .pet-name {
          background: #f3f4f6;
          padding: 0.1rem 0.5rem;
          border-radius: 999px;
        }
        .task-accordion summary .task-status {
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          background: #f3f4f6;
        }
        .task-accordion summary .task-status.done { background: #d1fae5; color: #065f46; }
        .task-accordion .task-details {
          padding: 0 1rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .task-accordion .task-details .detail-row {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }
        .task-accordion .task-details .detail-row label {
          font-weight: 500;
          min-width: 100px;
        }
        .task-accordion .task-details .detail-row input[type="datetime-local"] {
          padding: 0.3rem 0.6rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
        }
        .task-accordion .task-details .action-buttons {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        .task-accordion .task-details .action-buttons button {
          padding: 0.4rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-weight: 500;
        }
        .btn-delete { background: #ef4444; color: white; }
        .btn-delete:hover { background: #dc2626; }
        .btn-save { background: #3b82f6; color: white; }
        .btn-save:hover { background: #2563eb; }
      `}</style>

      <div className="task-feed">
        <h3>
          Bevorstehende Tasks <small>({tasks.length} gesamt)</small>
        </h3>

        {/* Status-Filter (Offen / Erledigt / Alle) */}
        <div className="status-filter-bar">
          <button
            className={statusFilter === 'all' ? 'active' : ''}
            onClick={() => setStatusFilter('all')}
          >
            Alle <span className="count-badge">{tasks.length}</span>
          </button>
          <button
            className={`${statusFilter === 'open' ? 'active open' : ''}`}
            onClick={() => setStatusFilter('open')}
          >
            Offen <span className="count-badge">{openCount}</span>
          </button>
          <button
            className={`${statusFilter === 'done' ? 'active done' : ''}`}
            onClick={() => setStatusFilter('done')}
          >
            Erledigt <span className="count-badge">{doneCount}</span>
          </button>
        </div>

        {/* Kategorie-Filter */}
        <h4>Kategorien</h4>
        <div className="filter-bar">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Alle</button>
          <button className={filter === 'pflege' ? 'active' : ''} onClick={() => setFilter('pflege')}>Pflege</button>
          <button className={filter === 'spaziergang' ? 'active' : ''} onClick={() => setFilter('spaziergang')}>Spaziergang</button>
          <button className={filter === 'tierarzt' ? 'active' : ''} onClick={() => setFilter('tierarzt')}>Tierarzt</button>
          <button className={filter === 'fütterung' ? 'active' : ''} onClick={() => setFilter('fütterung')}>Fütterung</button>
          <button className={filter === 'sonstiges' ? 'active' : ''} onClick={() => setFilter('sonstiges')}>Sonstiges</button>
        </div>

        {filteredTasks.length === 0 ? (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem 0' }}>
            {statusFilter === 'open' && 'Keine offenen Tasks für den ausgewählten Filter.'}
            {statusFilter === 'done' && 'Keine erledigten Tasks für den ausgewählten Filter.'}
            {statusFilter === 'all' && 'Keine Tasks für den ausgewählten Filter.'}
          </p>
        ) : (
          filteredTasks.map((task) => (
            <details key={task.id} className={`task-accordion ${task.completed ? 'completed-task' : ''}`}>
              <summary>
                <span className="task-icon">{getTaskIcon(task.title)}</span>
                <span className="task-info">
                  <span className="task-title">{task.title}</span>
                  <span className="task-meta">
                    <span>{formatDate(task.date)}</span>
                    <span className="pet-name">@{getPetName(task.petId)}</span>
                    <span className={`task-status ${task.completed ? 'done' : ''}`}>
                      {task.completed ? 'Erledigt' : 'Offen'}
                    </span>
                  </span>
                </span>
              </summary>
              <div className="task-details">
                <div className="detail-row">
                  <label>Datum & Uhrzeit</label>
                  <span>{formatDateTime(task.date)}</span>
                </div>
                <div className="detail-row">
                  <label>Kategorie</label>
                  <span style={{ background: '#f3f4f6', padding: '0.2rem 0.8rem', borderRadius: '999px' }}>
                    {task.category || 'Keine'}
                  </span>
                </div>
                <div className="detail-row">
                  <label>Erledigt</label>
                  <input
                    type="checkbox"
                    checked={task.completed || false}
                    onChange={(e) => handleCompletedChange(task, e)}
                  />
                </div>
                <div className="action-buttons">
                  <button className="btn-delete" onClick={() => deleteTask(task.id)}>
                    <Trash2 size={16} /> Löschen
                  </button>
                </div>
              </div>
            </details>
          ))
        )}
      </div>
    </>
  )
}

export default TaskFeed
