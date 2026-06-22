import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { fetchVets } from '../externalAPIs/vets'
import L from 'leaflet'

function Map() {
  const [position, setPosition] = useState(null)
  const [vets, setVets] = useState([])
  const [online, setOnline] = useState(navigator.onLine)
  const [geoEnabled, setGeoEnabled] = useState(() => {
    return localStorage.getItem('settings-geo') === 'true'
  })

  // Auf Änderungen von Online/Offline reagieren
  useEffect(() => {
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Auf Änderungen der Standort-Einstellung in anderen Tabs reagieren
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'settings-geo') {
        setGeoEnabled(e.newValue === 'true')
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Standort abfragen und Tierärzte laden
  useEffect(() => {
    // Nur wenn online und Standort freigegeben
    if (!online || !geoEnabled) {
      setPosition(null)
      setVets([])
      return
    }

    console.log('Standort wird ermittelt...')

    if (!navigator.geolocation) {
      console.log('Geolocation nicht verfügbar')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        console.log('GPS OK:', lat, lon)
        setPosition([lat, lon])

        // Tierärzte nur laden, wenn online (ist ja bereits gegeben)
        const vetData = await fetchVets(lat, lon)
        setVets(Array.isArray(vetData) ? vetData : [])
      },
      (err) => {
        console.error('GPS FEHLER:', err.message)
        // Fehlerbehandlung: z.B. setPosition(null) oder Meldung
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      }
    )
  }, [online, geoEnabled]) // ← Abhängigkeiten

  // --- Meldung anzeigen, wenn Bedingungen nicht erfüllt sind ---
  if (!online || !geoEnabled) {
    let message = ''
    if (!online && !geoEnabled) {
      message =
        'Sie sind offline und die Standortfreigabe ist deaktiviert. Bitte verbinden Sie sich mit dem Internet und schalten Sie die Standortfreigabe frei.'
    } else if (!online) {
      message =
        'Sie sind offline. Bitte verbinden Sie sich mit dem Internet, um Tierärzte in der Nähe zu sehen.'
    } else if (!geoEnabled) {
      message =
        'Die Standortfreigabe ist deaktiviert. Bitte aktivieren Sie sie in den Einstellungen.'
    }
    return (
      <div style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>
        <p>{message}</p>
      </div>
    )
  }

  if (!position) {
    return <p>Standort wird geladen...</p>
  }

  const vetIcon = new L.Icon({
    iconUrl: '/icons/doctor.webp',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  })

  return (
    <>
      <h3>Tierärzte in der Nähe</h3>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '300px', borderRadius: '16px', marginBottom: '80px' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>Du bist hier</Popup>
        </Marker>
        {vets.map((vet) => (
          <Marker
            key={vet.id ?? `${vet.lat}-${vet.lon}`}
            position={[vet.lat, vet.lon]}
            icon={vetIcon}
          >
            <Popup>{vet.tags?.name || 'Tierarzt'}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  )
}

export default Map
