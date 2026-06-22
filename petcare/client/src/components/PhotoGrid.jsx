import React, { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react'

const PhotoGrid = ({ date, onBack }) => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(null) // null = no modal

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

  const getPhotosByDate = async (dateStr) => {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAll()
      request.onsuccess = () => {
        const all = request.result
        const filtered = all.filter((photo) => {
          const photoDate = new Date(photo.createdAt)
            .toISOString()
            .split('T')[0]
          return photoDate === dateStr
        })
        resolve(filtered)
      }
      request.onerror = () => reject(request.error)
    })
  }

  const deletePhoto = async (photoId) => {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.delete(photoId)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const datedPhotos = await getPhotosByDate(date)
        setPhotos(datedPhotos)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [date])

  // Handlers
  const handleDelete = async (photoId, e) => {
    e.stopPropagation()
    if (window.confirm('Foto wirklich löschen?')) {
      await deletePhoto(photoId)
      setPhotos(photos.filter((p) => p.id !== photoId))
    }
  }

  const openFullscreen = (index) => setSelectedIndex(index)
  const closeFullscreen = () => setSelectedIndex(null)

  const goPrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }
  const goNext = () => {
    if (selectedIndex !== null && selectedIndex < photos.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return
      if (e.key === 'Escape') closeFullscreen()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedIndex, photos])

  const formatDateDisplay = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // Styles
  const styles = `
    .photo-grid-container {
      max-width: 500px;
      margin: 0 auto;
      padding: 1rem;
    }
    .grid-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .back-button {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 1rem;
      color: #3b82f6;
      padding: 0.5rem;
      border-radius: 2rem;
    }
    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 0.75rem;
    }
    .photo-item {
      position: relative;
      aspect-ratio: 1;
      border-radius: 0.75rem;
      overflow: hidden;
      background: #f3f4f6;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      cursor: pointer;
    }
    .photo-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .delete-btn {
      position: absolute;
      top: 4px;
      right: 4px;
      background: rgba(0,0,0,0.6);
      border: none;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
    }
    .empty-message {
      text-align: center;
      color: #6b7280;
      margin-top: 2rem;
    }

    /* Fullscreen Modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.92);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .modal-overlay .modal-content {
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: default;
    }
    .modal-overlay .modal-content img {
      max-width: 100%;
      max-height: 90vh;
      object-fit: contain;
      border-radius: 0.5rem;
    }
    .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(255,255,255,0.2);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
      transition: background 0.2s;
    }
    .modal-close:hover { background: rgba(255,255,255,0.3); }
    .modal-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255,255,255,0.2);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
      transition: background 0.2s;
    }
    .modal-nav:hover { background: rgba(255,255,255,0.3); }
    .modal-nav-left { left: 16px; }
    .modal-nav-right { right: 16px; }
    .photo-counter {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255,255,255,0.7);
      font-size: 0.9rem;
      background: rgba(0,0,0,0.5);
      padding: 0.3rem 0.8rem;
      border-radius: 2rem;
    }
  `

  if (loading)
    return (
      <div className="photo-grid-container">
        <style>{styles}</style>
        <div>Lade Fotos...</div>
      </div>
    )

  return (
    <div className="photo-grid-container">
      <style>{styles}</style>

      <div className="grid-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} /> Zurück
        </button>
        <h2 style={{ margin: 0 }}>{formatDateDisplay(date)}</h2>
      </div>

      {photos.length === 0 ? (
        <div className="empty-message">📷 Keine Fotos an diesem Tag.</div>
      ) : (
        <div className="photo-grid">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              className="photo-item"
              onClick={() => openFullscreen(idx)}
            >
              <img src={photo.imageData} alt={`Photo ${photo.id}`} />
              <button
                className="delete-btn"
                onClick={(e) => handleDelete(photo.id, e)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {selectedIndex !== null && (
        <div className="modal-overlay" onClick={closeFullscreen}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={photos[selectedIndex].imageData} alt="Full view" />
            <button className="modal-close" onClick={closeFullscreen}>
              <X size={24} />
            </button>
            {photos.length > 1 && (
              <>
                <button
                  className="modal-nav modal-nav-left"
                  onClick={goPrev}
                  disabled={selectedIndex === 0}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="modal-nav modal-nav-right"
                  onClick={goNext}
                  disabled={selectedIndex === photos.length - 1}
                >
                  <ChevronRight size={24} />
                </button>
                <div className="photo-counter">
                  {selectedIndex + 1} / {photos.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PhotoGrid
