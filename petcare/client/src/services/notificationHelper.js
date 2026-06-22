// Berechtigung anfordern
export const requestPermission = async () => {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false

  const result = await Notification.requestPermission()
  return result === 'granted'
}

// Notification senden (über Service Worker)
// notificationHelper.js
export const sendNotification = async (title, body) => {
  //  Zusätzlich: Eigenes UI‑Event auslösen (wenn Seite sichtbar)
  if (document.visibilityState === 'visible') {
    window.dispatchEvent(
      new CustomEvent('app-notification', {
        detail: { title, body },
      })
    )
  }

  // ... der Rest bleibt unverändert (Service Worker / Fallback)
  if (!('serviceWorker' in navigator)) {
    if (Notification.permission === 'granted') {
      new Notification(title, { body })
    }
    return
  }

  const registration = await navigator.serviceWorker.ready
  if (registration.active) {
    registration.active.postMessage({
      type: 'SHOW_NOTIFICATION',
      payload: { title, body, icon: '/icons/doctor.png' },
    })
  }
}

// Geplante Notification (mit Verzögerung)
export const scheduleNotification = (title, body, seconds = 0) => {
  if (seconds === 0) {
    sendNotification(title, body)
  } else {
    setTimeout(() => sendNotification(title, body), seconds * 1000)
  }
}
