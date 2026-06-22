import { useState } from 'react'
import { Clock, Moon, Calendar1 } from 'lucide-react'

function Time({ onTimeSelected, calendarRef }) {
  const [active, setActive] = useState('')

  const desiredTime = [
    {
      id: 'inOneHour',
      label: 'in 1 Std',
      icon: <Clock size={18} />,
      getDate: () => {
        const d = new Date()
        d.setHours(d.getHours() + 1)
        return d
      },
    },
    {
      id: 'tonight',
      label: 'heute nacht',
      icon: <Moon size={18} />,
      getDate: () => {
        const d = new Date()
        d.setHours(23, 59, 0, 0)
        return d
      },
    },
    {
      id: 'tomorrow',
      label: 'morgen',
      icon: <Calendar1 size={18} />,
      getDate: () => {
        const d = new Date()
        d.setDate(d.getDate() + 1)
        d.setHours(0, 0, 0, 0)
        return d
      },
    },
  ]

  const handleClick = (id, getDate) => {
    setActive(id)
    const date = getDate()

    // 1. Benachrichtige die Parent-Komponente (Reminder)
    if (onTimeSelected) onTimeSelected(date)

    // 2. Setze den Kalender-Wert (wenn vorhanden)
    if (calendarRef && calendarRef.current) {
      calendarRef.current.setValue(date)
    }
  }

  return (
    <>
      <style>{`
        .timeOfTask h3 { margin-bottom: 0.5rem; }
        .timeOfTask-list {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .time-btn {
          border: none;
          border-radius: 999px;
          padding: 0.45rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: #e5e7eb;
          cursor: pointer;
          font-size: 0.9rem;
          min-height: 35px;
          transition: all 0.2s;
        }
        .time-btn:hover { background: #d1d5db; }
        .time-btn.active {
          background: #3b82f6;
          color: white;
        }
        .time-btn.active .time-icon { color: white; }
      `}</style>
      <section className="timeOfTask">
        <h3>Wann ?</h3>
        <div className="timeOfTask-list">
          {desiredTime.map((t) => (
            <button
              key={t.id}
              className={active === t.id ? 'time-btn active' : 'time-btn'}
              onClick={() => handleClick(t.id, t.getDate)}
            >
              <span className="time-icon">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}

export default Time
