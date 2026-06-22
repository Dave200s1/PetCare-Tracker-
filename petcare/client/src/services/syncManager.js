import { getPendingRequests, removeFromQueue } from './offlineQueue'

export const syncPendingRequests = async () => {
  const pending = await getPendingRequests()
  if (pending.length === 0) return

  console.log(` Synchronisiere ${pending.length} ausstehende Requests...`)

  for (const req of pending) {
    try {
      const response = await fetch(req.url, {
        method: req.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.data),
      })
      if (response.ok) {
        await removeFromQueue(req.id)
        console.log(
          `Request ${req.id} synchronisiert (${req.method} ${req.url})`
        )
      } else {
        console.warn(
          `Request ${req.id} fehlgeschlagen (${response.status}) – wird später wiederholt`
        )
      }
    } catch (err) {
      console.error(` :( Sync-Fehler bei Request ${req.id}:`, err)
    }
  }
}
