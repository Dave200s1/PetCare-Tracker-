import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import TastFeed from './components/TaskFeed'
import Dashboard from './pages/Dashboard'
import Reminder from './pages/Reminder'
import Setting from './pages/Setting'
import SnapShot from './pages/SnapShot'
import Album from './pages/Album'
import { WifiOff, Wifi } from 'lucide-react'
import { syncPendingRequests } from './services/syncManager'

function App() {
  const [page, setPage] = useState('dashboard')
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // 1. Beim ersten Laden: Wenn online, sofort synchronisieren
  useEffect(() => {
    if (navigator.onLine) {
      syncPendingRequests()
    }
  }, [])

  // 2. Auf Online/Offline-Events reagieren
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      console.log(' Online – Synchronisiere ausstehende Requests...')
      syncPendingRequests()
    }
    const handleOffline = () => {
      setIsOnline(false)
      console.log('Offline – Änderungen werden lokal gespeichert.')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <>
      {/* Offline-Banner – wird nur bei !isOnline angezeigt */}
      {!isOnline && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            background: '#dc2626',
            color: 'white',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            fontWeight: '600',
            position: 'sticky',
            top: 0,
            zIndex: 9999,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            width: '100%',
          }}
        >
          <WifiOff size={18} />
          <span>
            Offline – Änderungen werden lokal gespeichert und später
            synchronisiert.
          </span>
        </div>
      )}

      {/* Online-Banner nur kurz einblenden, wenn wieder online */}
      {isOnline && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            background: '#16a34a',
            color: 'white',
            padding: '0.3rem 1rem',
            fontSize: '0.8rem',
            fontWeight: '500',
            position: 'sticky',
            top: 0,
            zIndex: 9999,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            width: '100%',
            animation: 'fadeOut 1.5s ease-in forwards',
          }}
        >
          <Wifi size={18} />
          <span>Online – Verbindung hergestellt.</span>
        </div>
      )}
      <main className="container-fluid" style={{ paddingBottom: '60px' }}>
        <Navigation setPage={setPage} />
        {page === 'dashboard' && <Dashboard />}
        {page === 'reminder' && <Reminder />}
        {page === 'settings' && <Setting />}
        {page === 'snaptshot' && <SnapShot />}
        {page === 'album' && <Album />}
      </main>

      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; display: none; }
        }
      `}</style>
    </>
  )
}

export default App
