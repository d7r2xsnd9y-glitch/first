import { useState } from 'react'
import type { View } from './components/BottomNav/BottomNav'
import BottomNav from './components/BottomNav/BottomNav'
import SwipeView from './components/SwipeView/SwipeView'
import FavoritesView from './components/FavoritesView/FavoritesView'
import { useStrains } from './hooks/useStrains'
import { useFavorites } from './hooks/useFavorites'
import { useDeck } from './hooks/useDeck'
import styles from './App.module.css'

export default function App() {
  const [activeView, setActiveView] = useState<View>('swipe')
  const { strains, loading, error, reload } = useStrains()
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const { currentIndex, isDone, onSwipe, reset } = useDeck(strains, addFavorite)

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.logo}>🌿 GreenSwipe</h1>
      </header>

      <main className={styles.main}>
        {activeView === 'swipe' ? (
          <SwipeView
            strains={strains}
            currentIndex={currentIndex}
            isDone={isDone}
            loading={loading}
            error={error}
            onSwipe={onSwipe}
            onReset={reset}
            onReload={reload}
          />
        ) : (
          <FavoritesView
            favorites={favorites}
            onRemove={removeFavorite}
          />
        )}
      </main>

      <BottomNav
        activeView={activeView}
        favoritesCount={favorites.length}
        onChange={setActiveView}
      />
    </div>
  )
}
