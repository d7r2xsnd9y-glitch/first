import styles from './BottomNav.module.css'

export type View = 'swipe' | 'favorites'

interface Props {
  activeView: View
  favoritesCount: number
  onChange: (view: View) => void
}

export default function BottomNav({ activeView, favoritesCount, onChange }: Props) {
  return (
    <nav className={styles.nav}>
      <button
        className={`${styles.tab} ${activeView === 'swipe' ? styles.active : ''}`}
        onClick={() => onChange('swipe')}
        aria-label="Discover"
      >
        <span className={styles.icon}>🌿</span>
        <span className={styles.label}>Discover</span>
      </button>

      <button
        className={`${styles.tab} ${activeView === 'favorites' ? styles.active : ''}`}
        onClick={() => onChange('favorites')}
        aria-label="Favorites"
      >
        <span className={styles.iconWrap}>
          <span className={styles.icon}>♥</span>
          {favoritesCount > 0 && (
            <span className={styles.badge}>
              {favoritesCount > 99 ? '99+' : favoritesCount}
            </span>
          )}
        </span>
        <span className={styles.label}>Favorites</span>
      </button>
    </nav>
  )
}
