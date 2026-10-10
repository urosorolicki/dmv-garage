'use client'

import * as React from 'react'

export const BENSKY_ORIGIN = 'https://portal.bensky.co.uk'

// Listens for the "vehicle-data" postMessage the Bensky tuning widget sends
// once a vehicle has been selected, and calls back with the vehicle name.
export function useBenskyVehicle(onSelect?: (vehicleName: string) => void) {
  const [vehicleName, setVehicleName] = React.useState<string | null>(null)
  const onSelectRef = React.useRef(onSelect)
  onSelectRef.current = onSelect

  React.useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== BENSKY_ORIGIN) return
      const data = event.data
      if (!data || typeof data !== 'object' || data.dataType !== 'vehicle-data') return
      const name = typeof data.vehicleName === 'string' ? data.vehicleName.trim() : ''
      if (!name) return
      setVehicleName(name)
      onSelectRef.current?.(name)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return vehicleName
}
