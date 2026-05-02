import { BellRing, MapPin, Camera, Settings2 } from 'lucide-react'

function Notification() {
  return (
    <>
      <style>{`
        .notifications {
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

      <div className="notifications">
        <h3 className="settings-title">
          <Settings2 size={18} />
          Erweiterte Einstellungen
        </h3>

        <div className="settings-list">
          {/* PUSH */}
          <div className="settings-item">
            <div className="settings-left">
              <BellRing size={18} />
              <div className="settings-text">
                <span>Push-Benachrichtigungen</span>
                <small>Erinnerungen aktivieren</small>
              </div>
            </div>
            <input type="checkbox" role="switch" />
          </div>

          {/* GEOLOCATION */}
          <div className="settings-item">
            <div className="settings-left">
              <MapPin size={18} />
              <div className="settings-text">
                <span>Standort teilen</span>
                <small>Tierärzte in der Nähe</small>
              </div>
            </div>
            <input type="checkbox" role="switch" />
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
            <input type="checkbox" role="switch" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Notification
