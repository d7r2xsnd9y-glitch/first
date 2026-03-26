import { useRef } from 'react'
import type { Strain } from '../../types/strain'
import type { SwipeDirection } from '../../hooks/useDeck'
import StrainCard, { type StrainCardRef } from './StrainCard/StrainCard'
import ActionButtons from './ActionButtons/ActionButtons'
import styles from './SwipeView.module.css'

interface Props {
  strains: Strain[]
  currentIndex: number
  isDone: boolean
  loading: boolean
  error: string | null
  onSwipe: (direction: SwipeDirection, strain: Strain) => void
  onReset: () => void
  onReload: () => void
}

export default function SwipeView({
  strains,
  currentIndex,
  isDone,
  loading,
  error,
  onSwipe,
  onReset,
  onReload,
}: Props) {
  const topCardRef = useRef<StrainCardRef>(null)

  if (loading) {
    return (
      <div className={styles.center}>
        <div className={styles.spinner} />
        <p className={styles.loadingText}>Loading strains...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.center}>
        <div className={styles.errorEmoji}>🌿</div>
        <p className={styles.errorText}>Couldn't reach the strain database</p>
        <p className={styles.errorSub}>{error}</p>
        <button className={styles.actionBtn} onClick={onReload}>Try Again</button>
      </div>
    )
  }

  if (isDone) {
    return (
      <div className={styles.center}>
        <div className={styles.doneEmoji}>🎉</div>
        <p className={styles.doneText}>You've seen them all!</p>
        <p className={styles.doneSub}>Check your Favorites or start over</p>
        <button className={styles.actionBtn} onClick={onReset}>Start Over</button>
      </div>
    )
  }

  const visibleStrains = strains.slice(currentIndex, currentIndex + 3)

  const handleButtonSwipe = (direction: SwipeDirection) => {
    topCardRef.current?.triggerSwipe(direction)
  }

  return (
    <div className={styles.view}>
      <div className={styles.deck}>
        {/* Render back-to-front so top card is last in DOM */}
        {[...visibleStrains].reverse().map((strain, reversedIdx) => {
          const stackOffset = visibleStrains.length - 1 - reversedIdx
          const isTop = stackOffset === 0
          return (
            <StrainCard
              key={strain.id}
              ref={isTop ? topCardRef : undefined}
              strain={strain}
              isTop={isTop}
              stackOffset={stackOffset}
              onSwipe={onSwipe}
            />
          )
        })}
      </div>

      <div className={styles.counter}>
        {currentIndex + 1} / {strains.length}
      </div>

      <ActionButtons
        onPass={() => handleButtonSwipe('left')}
        onLike={() => handleButtonSwipe('right')}
      />
    </div>
  )
}
