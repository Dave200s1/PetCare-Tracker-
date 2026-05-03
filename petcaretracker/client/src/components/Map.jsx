import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { fetchVets } from '../externalAPIs/vets'
import L from 'leaflet'

function Map() {
  const [position, setPosition] = useState(null)
  const [vets, setVets] = useState([])

  const vetIcon = new L.Icon({
    iconUrl: '/icons/doctor.webp',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  })

  useEffect(() => {
    console.log('Standort wird ermittelt...')

    if (!navigator.geolocation) {
      console.log('Geolocation nicht verfügbar')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude

        console.log('GPS OK:')

        setPosition([lat, lon])

        const vetData = await fetchVets(lat, lon)
        setVets(Array.isArray(vetData) ? vetData : [])
      },
      (err) => {
        console.error('GPS FEHLER:', err.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      }
    )
  }, [])

  if (!position) return <p>Standort wird geladen...</p>

  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '300px', borderRadius: '16px' }}
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
