import { useRef } from 'react'
import { Calendar } from 'jsuites/react'
import 'jsuites/dist/jsuites.css'

function UserCalender() {
  const calendar = useRef(null)
  return (
    <>
      <style>{`
.jcalendar button {
  color: #0d6efd !important;
  font-weight: 600;
  opacity: 1 !important;
}
`}</style>{' '}
      <Calendar
        ref={calendar}
        fullscreen={true}
        monthsFull={[
          'Januar',
          'Februar',
          'März',
          'April',
          'Mai',
          'Juni',
          'Juli',
          'August',
          'September',
          'Oktober',
          'November',
          'Dezember',
        ]}
        weekdays={['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']}
        textDone={'Fertig'}
        textReset={'Schließen'}
        textUpdate={'Speichern'}
        startingDay={0}
        format={'YYYY-MM-DD  HH24:MI'}
        placeholder={'Datum & Uhrzeit festlegen'}
        time={true}
      />
    </>
  )
}

export default UserCalender
