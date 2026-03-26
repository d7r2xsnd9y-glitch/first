import { useState } from 'react'
import type { Strain } from '../../types/strain'
import FavoriteCard from '../FavoriteCard/FavoriteCard'
import { shareFavorites, shareStrain } from '../../utils/share'
import styles from './FavoritesView.module.css'

interface Props {
  favorites: Strain[]
  onRemove: (id: number) => void
}

export default function FavoritesView({ favorites, onRemove }: Props) {
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const handleShareAll = async () => {
    const result = await shareFavorites(favorites)
    if (result === 'copied') showToast('Copied to clipboard!')
    else if (result === 'error') showToast('Could not share')
  }

  const handleShareOne = async (strain: Strain) => {
    const result = await shareStrain(strain)
    if (result === 'copied') showToast(`${strain.name} copied!`)
    else if (result === 'error') showToast('Could not share')
  }

  if (favorites.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyEmoji}>💚</div>
        <p className={styles.emptyText}>No favorites yet</p>
        <p className={styles.emptySub}>Swipe right on strains you like!</p>
      </div>
    )
  }

  return (
    <div className={styles.view}>
      <div className={styles.header}>
        <h2 className={styles.title}>Your Stash <span className={styles.count}>{favorites.length}</span></h2>
        <button className={styles.shareAllBtn} onClick={handleShareAll}>
          Share All ↗
        </button>
      </div>

      <div className={styles.list}>
        {favorites.map(strain => (
          <FavoriteCard
            key={strain.id}
            strain={strain}
            onRemove={onRemove}
            onShare={handleShareOne}
          />
        ))}
      </div>

      {toast && (
        <div className={styles.toast}>{toast}</div>
      )}
    </div>
  )
}
