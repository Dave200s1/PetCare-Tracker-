export async function fetchVets(lat, lon) {
  const API_KEY = import.meta.env.VITE_API_SECRET_KEY
  //Radium von 50.000 meter oder 50km
  const res = await fetch(
    `https://api.latlng.work/v1/places/nearby?lat=${lat}&lon=${lon}&radius=50000&category=veterinary`,
    {
      headers: {
        'X-Api-Key': API_KEY,
      },
    }
  )

  if (!res.ok) {
    throw new Error('API Fehler: ' + res.status)
  }

  const data = await res.json()
  console.log('RAW API RESPONSE:', data)

  return data.places ?? []
}
