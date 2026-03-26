import type { Strain } from '../../types/strain'
import styles from './FavoriteCard.module.css'

interface Props {
  strain: Strain
  onRemove: (id: number) => void
  onShare: (strain: Strain) => void
}

export default function FavoriteCard({ strain, onRemove, onShare }: Props) {
  const typeColor = strain.type === 'indica' ? '#a78bfa' : strain.type === 'sativa' ? '#fbbf24' : '#34d399'

  return (
    <div
      className={styles.card}
      style={{ background: `linear-gradient(135deg, ${strain.artColors[0]}33, ${strain.artColors[1]}22)` }}
    >
      <div className={styles.artBadge}>{strain.artEmoji}</div>
      <div className={styles.info}>
        <div className={styles.top}>
          <span className={styles.name}>{strain.name}</span>
          <span className={styles.type} style={{ color: typeColor }}>{strain.type}</span>
        </div>
        {strain.effects.length > 0 && (
          <p className={styles.effects}>{strain.effects.slice(0, 3).join(' · ')}</p>
        )}
        <div className={styles.actions}>
          <a
            href={strain.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buyLink}
          >
            🛒 Buy
          </a>
          <a
            href={strain.leaflyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoLink}
          >
            Info
          </a>
          <button
            className={styles.shareBtn}
            onClick={() => onShare(strain)}
            aria-label="Share"
          >
            ↗
          </button>
          <button
            className={styles.removeBtn}
            onClick={() => onRemove(strain.id)}
            aria-label="Remove"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
