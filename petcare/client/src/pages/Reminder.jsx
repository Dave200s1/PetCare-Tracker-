import { useState, useRef } from 'react'
import Category from '../components/Category'
import Time from '../components/Time'
import UserCalender from '../components/UserCalender'
import Note from '../components/Note'
import Pet from '../components/Pet'

function Reminder() {
  const [selectedPetId, setSelectedPetId] = useState('')
  const [taskDate, setTaskDate] = useState(null)
  const calendarRef = useRef(null) // Ref für den Kalender

  const handlePetSelected = (petId) => setSelectedPetId(petId)
  const handleTimeSelected = (date) => setTaskDate(date)
  const handleDateSelected = (date) => setTaskDate(date)

  return (
    <>
      <Pet onPetSelected={handlePetSelected} />
      <Time
        onTimeSelected={handleTimeSelected}
        calendarRef={calendarRef} // ← Kalender-Ref übergeben
      />
      <UserCalender
        ref={calendarRef} // ← Ref setzen
        onDateSelected={handleDateSelected}
      />
      <Note petId={selectedPetId} taskDate={taskDate} />
    </>
  )
}

export default Reminder
