import TastFeed from '../components/TaskFeed'
import FilterHaustiere from '../components/FilterHaustiere'
import Map from '../components/Map'

function Dashboard() {
  return (
    <>
      <main>
        <FilterHaustiere></FilterHaustiere>
        <TastFeed></TastFeed>
        <Map></Map>
      </main>
    </>
  )
}

export default Dashboard
