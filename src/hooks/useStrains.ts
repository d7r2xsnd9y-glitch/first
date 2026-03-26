import { useState, useEffect, useCallback } from 'react'
import type { Strain } from '../types/strain'
import { fetchAllStrains } from '../api/strains'

interface StrainsState {
  strains: Strain[]
  loading: boolean
  error: string | null
  reload: () => void
}

export function useStrains(): StrainsState {
  const [strains, setStrains] = useState<Strain[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const reload = useCallback(() => {
    setStrains([])
    setError(null)
    setLoading(true)
    setTick(t => t + 1)
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchAllStrains()
      .then(data => {
        if (!cancelled) {
          setStrains(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load strains')
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [tick])

  return { strains, loading, error, reload }
}
