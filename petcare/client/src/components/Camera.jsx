import React, { useRef, useState, useEffect } from 'react'
import { Camera, Cat, Dog, Bird, ShieldCheck, Repeat, Save } from 'lucide-react'

const CameraComponent = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const timeoutRef = useRef(null)
  const [photo, setPhoto] = useState(null)
  const [stream, setStream] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cameraEnabled, setCameraEnabled] = useState(() => {
    return localStorage.getItem('settings-camera') === 'true'
  })

  // Auf Änderungen in localStorage reagieren (wenn andere Tabs die Einstellung ändern)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'settings-camera') {
        setCameraEnabled(e.newValue === 'true')
        // Wenn Kamera deaktiviert wurde und sie läuft, stoppen
        if (e.newValue === 'false' && stream) {
          stopCamera()
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [stream])

  // ========== IndexedDB ==========
  const DB_NAME = 'PetCareDB'
  const STORE_NAME = 'photos'

  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, {
            keyPath: 'id',
            autoIncrement: true,
          })
        }
      }
    })
  }

  const savePhotoToIndexedDB = async (photoDataURL, petId) => {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const record = {
        petId: petId,
        imageData: photoDataURL,
        createdAt: new Date().toISOString(),
      }
      const request = store.add(record)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // ========== Auto‑increment pet ID (localStorage) ==========
  const getNextPetId = () => {
    const lastId = localStorage.getItem('nextPetId')
    let nextId = lastId ? parseInt(lastId, 10) : 1
    localStorage.setItem('nextPetId', nextId + 1)
    return nextId
  }

  // ========== Camera helpers ==========
  const clearAutoCloseTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const stopCamera = () => {
    clearAutoCloseTimeout()
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }

  const startCamera = async () => {
    // Prüfen, ob Kamera in Einstellungen aktiviert ist
    const isEnabled = localStorage.getItem('settings-camera') === 'true'
    if (!isEnabled) {
      alert(
        'Kamera-Zugriff ist in den Einstellungen deaktiviert. Bitte aktiviere ihn zuerst.'
      )
      return
    }

    stopCamera()
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      })
      setStream(mediaStream)
      if (videoRef.current) videoRef.current.srcObject = mediaStream

      clearAutoCloseTimeout()
      timeoutRef.current = setTimeout(() => {
        console.log('Auto‑closing camera after 7 seconds')
        stopCamera()
      }, 7000)
    } catch (err) {
      console.error('Camera error:', err)
      alert('Kamera konnte nicht gestartet werden.')
    }
  }

  const capturePhoto = () => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (canvas && video && video.videoWidth) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const imageData = canvas.toDataURL('image/jpeg')
      setPhoto(imageData)
      stopCamera()
      clearAutoCloseTimeout()
    }
  }

  const retakePhoto = () => {
    setPhoto(null)
    startCamera()
  }

  const savePhoto = async () => {
    if (!photo) return
    setLoading(true)
    try {
      const newPetId = getNextPetId()
      await savePhotoToIndexedDB(photo, newPetId)
      alert(`Pet photo saved! Pet ID: ${newPetId}`)
      setPhoto(null)
    } catch (err) {
      alert('Failed to save photo')
    } finally {
      setLoading(false)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCamera()
  }, [])

  const styles = `
    .pet-camera-card {
      max-width: 400px;
      margin: 0 auto;
      background: white;
      border-radius: 2rem;
      box-shadow: 0 20px 35px -10px rgba(0,0,0,0.2);
      overflow: hidden;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, sans-serif;
    }
    .pet-camera-header {
      background: linear-gradient(135deg, #3b82f6 0%, #b7d4f0 100%);
      padding: 1.5rem;
      text-align: center;
      color: white;
    }
    .pet-camera-header h2 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .pet-camera-header p {
      margin: 0.5rem 0 0;
      opacity: 0.9;
      font-size: 0.9rem;
    }
    .pet-icons {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 1rem;
    }
    .camera-preview {
      background: #111;
      border-radius: 1.5rem;
      margin: 1.5rem;
      overflow: hidden;
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      position: relative;
      aspect-ratio: 4 / 3;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .camera-preview video, .camera-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .info-text {
      padding: 0 1.5rem;
      text-align: center;
      color: #4b5563;
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .button-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
      padding: 0 1.5rem 2rem;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.8rem;
      border: none;
      border-radius: 3rem;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      flex: 1;
    }
    .btn-primary {
      background: #3b82f6;
      color: white;
      box-shadow: 0 4px 8px rgba(59,130,246,0.3);
    }
    .btn-secondary {
      background: #e5e7eb;
      color: #374151;
    }
    .btn-primary:active { transform: scale(0.96); }
    .btn-secondary:active { transform: scale(0.96); }
    .btn:disabled { opacity: 0.6; transform: none; cursor: not-allowed; }
    .secure-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.3rem;
      font-size: 0.7rem;
      color: #6b7280;
      padding: 0 1.5rem 1rem;
      text-align: center;
    }
  `

  return (
    <div className="pet-camera-card" style={{ marginBottom: '90px' }}>
      <style>{styles}</style>

      <div className="pet-camera-header">
        <h2>
          <Camera size={28} strokeWidth={1.8} />
          Pet Photo
        </h2>
        <div className="pet-icons">
          <Cat size={28} strokeWidth={1.5} />
          <Dog size={28} strokeWidth={1.5} />
          <Bird size={28} strokeWidth={1.5} />
        </div>
        <p>Haustier fotografieren</p>
      </div>

      <div className="camera-preview">
        {!photo ? (
          <video ref={videoRef} autoPlay playsInline />
        ) : (
          <img src={photo} alt="Pet preview" />
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      <div className="info-text">
        <ShieldCheck size={16} />
        <span>
          Das Foto Ihres Haustieres wird sicher auf diesem Gerät (IndexedDB)
          gespeichert und niemals ohne Ihre Zustimmung hochgeladen.
        </span>
      </div>

      {!photo ? (
        <div className="button-group">
          {!stream ? (
            <button
              className="btn btn-primary"
              onClick={startCamera}
              disabled={!cameraEnabled}
            >
              {cameraEnabled ? 'Kamera starten' : ' Kamera deaktiviert'}
            </button>
          ) : (
            <button className="btn btn-primary" onClick={capturePhoto}>
              <Camera size={18} /> Foto aufnahme
            </button>
          )}
        </div>
      ) : (
        <div className="button-group">
          <button className="btn btn-secondary" onClick={retakePhoto}>
            <Repeat size={18} /> Nochmal
          </button>
          <button
            className="btn btn-primary"
            onClick={savePhoto}
            disabled={loading}
          >
            <Save size={18} /> {loading ? 'speichern...' : 'Lokal speichern'}
          </button>
        </div>
      )}

      <div className="secure-badge">
        <ShieldCheck size={12} />
        <span> Nur für diese App</span>
      </div>
    </div>
  )
}

export default CameraComponent
