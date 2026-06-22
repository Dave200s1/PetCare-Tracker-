import React, { useState, useEffect } from 'react'
import { Calendar, ChevronRight } from 'lucide-react'
import PhotoGrid from '../components/PhotoGrid' // will be modified next

const Album = () => {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null) // null = show albums

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

  const getAllPhotos = async () => {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAll()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // Helper: format date for display
  const formatDate = (date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    const inputDate = new Date(date)
    if (inputDate.toDateString() === today.toDateString()) return 'Heute'
    if (inputDate.toDateString() === yesterday.toDateString()) return 'Gestern'
    return inputDate.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  useEffect(() => {
    const loadAlbums = async () => {
      setLoading(true)
      try {
        const photos = await getAllPhotos()
        const groups = {}
        photos.forEach((photo) => {
          const dateStr = new Date(photo.createdAt).toISOString().split('T')[0] // YYYY-MM-DD
          if (!groups[dateStr]) {
            groups[dateStr] = {
              date: dateStr,
              count: 0,
              latestDate: new Date(photo.createdAt),
            }
          }
          groups[dateStr].count++
          const photoDate = new Date(photo.createdAt)
          if (photoDate > groups[dateStr].latestDate) {
            groups[dateStr].latestDate = photoDate
          }
        })
        const albumList = Object.values(groups).sort(
          (a, b) => b.latestDate - a.latestDate
        )
        setAlbums(albumList)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadAlbums()
  }, [])

  const styles = `
    .album-container {
      max-width: 500px;
      margin: 0 auto;
      padding: 1rem;
    }
    .album-card {
      background: white;
      border-radius: 1.5rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      margin-bottom: 1rem;
      overflow: hidden;
      transition: transform 0.1s ease;
      cursor: pointer;
    }
    .album-card:active { transform: scale(0.99); }
    .album-content {
      display: flex;
      align-items: center;
      padding: 1rem;
      gap: 1rem;
    }
    .album-icon {
      background: linear-gradient(135deg, #3b82f6, #b7d4f0);
      width: 48px;
      height: 48px;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .album-info { flex: 1; }
    .album-title { font-size: 1.1rem; font-weight: 600; margin: 0; color: #1f2937; }
    .album-count { font-size: 0.8rem; color: #6b7280; margin: 0.2rem 0 0; }
    .album-arrow { color: #9ca3af; }
    .loading-text { text-align: center; color: #6b7280; margin-top: 2rem; }
  `

  if (selectedDate !== null) {
    // Show photo grid for the selected date
    return (
      <PhotoGrid date={selectedDate} onBack={() => setSelectedDate(null)} />
    )
  }

  if (loading) {
    return (
      <div className="album-container">
        <style>{styles}</style>
        <div className="loading-text"> Lade Alben...</div>
      </div>
    )
  }

  if (albums.length === 0) {
    return (
      <div className="album-container">
        <style>{styles}</style>
        <div className="loading-text">
          Keine Fotos vorhanden. Nimm zuerst ein Foto auf.
        </div>
      </div>
    )
  }

  return (
    <div className="album-container">
      <style>{styles}</style>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Calendar size={24} /> Meine Alben
      </h2>
      {albums.map((album) => (
        <div
          key={album.date}
          className="album-card"
          onClick={() => setSelectedDate(album.date)}
        >
          <div className="album-content">
            <div className="album-icon">
              <Calendar size={24} />
            </div>
            <div className="album-info">
              <h3 className="album-title">{formatDate(album.date)}</h3>
              <p className="album-count">
                {album.count} {album.count === 1 ? 'Foto' : 'Fotos'}
              </p>
            </div>
            <div className="album-arrow">
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Album
