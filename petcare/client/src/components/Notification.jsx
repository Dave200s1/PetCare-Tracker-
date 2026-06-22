import { useState, useEffect } from 'react'
import { BellRing, MapPin, Camera, Settings2 } from 'lucide-react'

function Settings() {
  // Zustände aus localStorage laden
  const [pushEnabled, setPushEnabled] = useState(() => {
    return localStorage.getItem('settings-push') === 'true'
  })
  const [geoEnabled, setGeoEnabled] = useState(() => {
    return localStorage.getItem('settings-geo') === 'true'
  })
  const [cameraEnabled, setCameraEnabled] = useState(() => {
    return localStorage.getItem('settings-camera') === 'true'
  })

  // Bei Änderung in localStorage speichern
  useEffect(() => {
    localStorage.setItem('settings-push', pushEnabled)
  }, [pushEnabled])

  useEffect(() => {
    localStorage.setItem('settings-geo', geoEnabled)
  }, [geoEnabled])

  useEffect(() => {
    localStorage.setItem('settings-camera', cameraEnabled)
  }, [cameraEnabled])

  // --- Handler für Push ---
  const handlePushToggle = async (e) => {
    const checked = e.target.checked
    if (checked) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          setPushEnabled(true)
        } else {
          alert(
            'Push-Benachrichtigungen wurden abgelehnt. Bitte erlaube sie in den Browser-Einstellungen.'
          )
          e.target.checked = false
          setPushEnabled(false)
        }
      } else {
        alert('Dieser Browser unterstützt keine Push-Benachrichtigungen.')
        e.target.checked = false
        setPushEnabled(false)
      }
    } else {
      setPushEnabled(false)
    }
  }

  // --- Handler für Geolocation ---
  const handleGeoToggle = (e) => {
    const checked = e.target.checked
    if (checked) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          () => {
            setGeoEnabled(true)
          },
          (err) => {
            alert(
              'Standortzugriff wurde abgelehnt. Bitte erlaube ihn in den Browser-Einstellungen.'
            )
            e.target.checked = false
            setGeoEnabled(false)
          }
        )
      } else {
        alert('Dieser Browser unterstützt keine Geolokalisierung.')
        e.target.checked = false
        setGeoEnabled(false)
      }
    } else {
      setGeoEnabled(false)
    }
  }

  // --- Handler für Kamera ---
  const handleCameraToggle = async (e) => {
    const checked = e.target.checked
    if (checked) {
      if (
        'mediaDevices' in navigator &&
        'getUserMedia' in navigator.mediaDevices
      ) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          })
          // Erfolgreich – Kamera sofort freigeben
          stream.getTracks().forEach((track) => track.stop())
          setCameraEnabled(true)
        } catch (err) {
          alert(
            'Kamerazugriff wurde abgelehnt. Bitte erlaube ihn in den Browser-Einstellungen.'
          )
          e.target.checked = false
          setCameraEnabled(false)
        }
      } else {
        alert('Dieser Browser unterstützt keine Kamera.')
        e.target.checked = false
        setCameraEnabled(false)
      }
    } else {
      setCameraEnabled(false)
    }
  }

  return (
    <>
      <style>{`
        .settings-container {
          margin-top: 1rem;
        }
        .settings-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .settings-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .settings-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          background: var(--pico-background-color);
          border: 1px solid #e5e7eb;
        }
        .settings-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .settings-text {
          display: flex;
          flex-direction: column;
        }
        .settings-text small {
          font-size: 0.75rem;
          color: #6b7280;
        }
        input[type="checkbox"][role="switch"] {
          transform: scale(1.1);
        }
      `}</style>

      <div className="settings-container">
        <h3 className="settings-title">
          <Settings2 size={18} />
          Erweiterte Einstellungen
        </h3>

        <div className="settings-list">
          {/* Push */}
          <div className="settings-item">
            <div className="settings-left">
              <BellRing size={18} />
              <div className="settings-text">
                <span>Push-Benachrichtigungen</span>
                <small>Erinnerungen aktivieren</small>
              </div>
            </div>
            <input
              type="checkbox"
              role="switch"
              checked={pushEnabled}
              onChange={handlePushToggle}
            />
          </div>

          {/* Geolocation */}
          <div className="settings-item">
            <div className="settings-left">
              <MapPin size={18} />
              <div className="settings-text">
                <span>Standort teilen</span>
                <small>Tierärzte in der Nähe</small>
              </div>
            </div>
            <input
              type="checkbox"
              role="switch"
              checked={geoEnabled}
              onChange={handleGeoToggle}
            />
          </div>

          {/* Kamera */}
          <div className="settings-item">
            <div className="settings-left">
              <Camera size={18} />
              <div className="settings-text">
                <span>Kamera Zugriff</span>
                <small>Fotos für Haustiere hinzufügen</small>
              </div>
            </div>
            <input
              type="checkbox"
              role="switch"
              checked={cameraEnabled}
              onChange={handleCameraToggle}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
