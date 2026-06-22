import { useState } from 'react'
import Camera from '../components/Camera'

function ComponentName() {
  const [state, setState] = useState(null)

  return (
    <>
      <Camera></Camera>
    </>
  )
}

export default ComponentName
