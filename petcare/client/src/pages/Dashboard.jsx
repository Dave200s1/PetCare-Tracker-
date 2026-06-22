import TastFeed from '../components/TaskFeed'
import FilterHaustiere from '../components/FilterHaustiere'
import Map from '../components/Map'
import { scheduleNotification } from '../services/notificationHelper'

function Dashboard() {
  return (
    <>
      <main>
        <TastFeed></TastFeed>
        <Map></Map>
      </main>
    </>
  )
}

export default Dashboard
