import { useState, useCallback } from 'react'
import type { Strain } from '../types/strain'

const KEY = 'greenswipe-favorites'

function loadFromStorage(): Strain[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Strain[]) : []
  } catch {
    return []
  }
}

function saveToStorage(strains: Strain[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(strains))
  } catch {
    // storage full or unavailable — silently ignore
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Strain[]>(loadFromStorage)

  const addFavorite = useCallback((strain: Strain) => {
    setFavorites(prev => {
      if (prev.some(s => s.id === strain.id)) return prev
      const next = [strain, ...prev]
      saveToStorage(next)
      return next
    })
  }, [])

  const removeFavorite = useCallback((id: number) => {
    setFavorites(prev => {
      const next = prev.filter(s => s.id !== id)
      saveToStorage(next)
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (id: number) => favorites.some(s => s.id === id),
    [favorites]
  )

  return { favorites, addFavorite, removeFavorite, isFavorite }
}
