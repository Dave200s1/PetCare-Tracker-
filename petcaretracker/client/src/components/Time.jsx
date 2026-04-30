import { useState } from 'react'
import { Clock, Moon, Calendar1 } from 'lucide-react'
//import { Calendar } from 'jsuites/react'
//import 'jsuites/dist/jsuites.css'
//import { useRef } from 'react'

function Time() {
  const [active, setActive] = useState('tonight')

  const desiredTime = [
    { id: 'inOneHour', label: 'in 1 Std', icon: <Clock></Clock> },
    { id: 'tonight', label: 'heute nacht', icon: <Moon></Moon> },
    { id: 'tomorrow', label: 'morgen', icon: <Calendar1></Calendar1> },
  ]
  return (
    <>
      <style>{`
        .timeOfTask h3 {
          margin-bottom: 1rem;
        }

        .timeOfTask-list {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .time-btn {
          border: none;
          border-radius: 999px;
          padding: 0.45rem 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: #dad7d7;
          cursor: pointer;
          font-size: 0.9rem;
          min-height: 35px;
        }

        .time-btn.active {
          background: #3b82f6;;
          color: white;
        }

    `}</style>
      <section className="timeOfTask">
        <h3>Wann ?</h3>
        <div className="timeOfTask-list">
          {desiredTime.map((t) => (
            <button
              key={t.id}
              className={active === t.id ? 'time-btn active' : 'time-btn'}
              onClick={() => setActive(t.id)}
            >
              <div className="timeIcon">{t.icon}</div>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}

export default Time
