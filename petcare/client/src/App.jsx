import { useState } from 'react'
import Navigation from './components/Navigation'
import TastFeed from './components/TaskFeed'
import Dashboard from './pages/Dashboard'
import Reminder from './pages/Reminder'
import Setting from './pages/Setting'
import SnapShot from './pages/SnapShot'

function App() {
  const [page, setPage] = useState('dashboard')
  return (
    <>
      <main className="container-fluid">
        <Navigation setPage={setPage} />
        {page === 'dashboard' && <Dashboard />}
        {page === 'reminder' && <Reminder />}
        {page === 'settings' && <Setting />}
        {page === 'snaptshot' && <SnapShot />}
      </main>
    </>
  )
}

export default App
