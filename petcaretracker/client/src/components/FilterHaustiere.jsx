import { Dog, Cat, CalendarCheck2 } from 'lucide-react'
import { useState } from 'react'

function FilterHaustiere() {
  const [active, setActive] = useState('all')

  const buttonStyle = (type) => ({
    borderRadius: '12px',
    padding: '12px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: active === type ? '#3b82f6' : '#f1f5f9',
    color: active === type ? 'white' : '#334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '128px',
    height: '48px',
    transition: 'all 0.2s ease',
  })

  return (
    <>
      <div className="FilterList">
        <h3>Filtere Haustiere</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={buttonStyle('dogs')} onClick={() => setActive('dogs')}>
            <Dog size={20}></Dog>Hunde
          </button>
          <button style={buttonStyle('cats')} onClick={() => setActive('cats')}>
            <Cat size={20}>Cats</Cat>Katzen
          </button>
          <button style={buttonStyle('all')} onClick={() => setActive('all')}>
            <CalendarCheck2 size={20}></CalendarCheck2>Alle
          </button>
        </div>
      </div>
    </>
  )
}

export default FilterHaustiere
