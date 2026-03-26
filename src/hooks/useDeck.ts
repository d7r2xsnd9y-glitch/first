import { useState, useCallback } from 'react'
import type { Strain } from '../types/strain'

export type SwipeDirection = 'left' | 'right'

interface DeckState {
  currentIndex: number
  isDone: boolean
  onSwipe: (direction: SwipeDirection, strain: Strain) => void
  reset: () => void
}

export function useDeck(
  strains: Strain[],
  onLike: (strain: Strain) => void
): DeckState {
  const [currentIndex, setCurrentIndex] = useState(0)

  const isDone = strains.length > 0 && currentIndex >= strains.length

  const onSwipe = useCallback(
    (direction: SwipeDirection, strain: Strain) => {
      if (direction === 'right') {
        onLike(strain)
      }
      setCurrentIndex(i => i + 1)
    },
    [onLike]
  )

  const reset = useCallback(() => {
    setCurrentIndex(0)
  }, [])

  return { currentIndex, isDone, onSwipe, reset }
}
