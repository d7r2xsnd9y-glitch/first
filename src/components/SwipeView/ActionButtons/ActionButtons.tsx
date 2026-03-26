import styles from './ActionButtons.module.css'

interface Props {
  onPass: () => void
  onLike: () => void
  disabled?: boolean
}

export default function ActionButtons({ onPass, onLike, disabled }: Props) {
  return (
    <div className={styles.row}>
      <button
        className={`${styles.btn} ${styles.pass}`}
        onClick={onPass}
        disabled={disabled}
        aria-label="Pass"
      >
        ✕
      </button>
      <button
        className={`${styles.btn} ${styles.like}`}
        onClick={onLike}
        disabled={disabled}
        aria-label="Like"
      >
        ♥
      </button>
    </div>
  )
}
