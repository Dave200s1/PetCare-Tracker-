import { useRef, forwardRef, useImperativeHandle } from 'react'

const UserCalender = forwardRef(({ onDateSelected }, ref) => {
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    setValue: (date) => {
      if (inputRef.current && date) {
        const d = new Date(date)
        // Lokale Zeit formatieren: YYYY-MM-DDTHH:mm
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const hours = String(d.getHours()).padStart(2, '0')
        const minutes = String(d.getMinutes()).padStart(2, '0')
        const localString = `${year}-${month}-${day}T${hours}:${minutes}`
        inputRef.current.value = localString
        // Parent-Komponente benachrichtigen
        if (onDateSelected) onDateSelected(d)
      }
    },
  }))

  const handleChange = (e) => {
    const value = e.target.value
    if (value && onDateSelected) {
      const date = new Date(value)
      if (!isNaN(date)) {
        onDateSelected(date)
      }
    }
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        style={{ display: 'block', fontWeight: '600', marginBottom: '0.2rem' }}
      >
        Datum & Uhrzeit
      </label>
      <input
        ref={inputRef}
        type="datetime-local"
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '0.5rem',
          borderRadius: '0.5rem',
          border: '1px solid #d1d5db',
          fontSize: '1rem',
        }}
      />
    </div>
  )
})

export default UserCalender
