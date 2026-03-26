import styles from './StrainArt.module.css'

interface Props {
  emoji: string
  colors: [string, string]
  name: string
}

export default function StrainArt({ emoji, colors, name }: Props) {
  const gradientId = `grad-${name.replace(/\s+/g, '-')}`

  return (
    <div className={styles.art}>
      <svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>
        {/* Background */}
        <rect width="340" height="220" fill={`url(#${gradientId})`} />
        {/* Decorative circles */}
        <circle cx="290" cy="30" r="60" fill="rgba(255,255,255,0.05)" />
        <circle cx="50" cy="190" r="70" fill="rgba(255,255,255,0.04)" />
        <circle cx="170" cy="110" r="40" fill="rgba(255,255,255,0.04)" />
        <circle cx="310" cy="160" r="30" fill="rgba(255,255,255,0.06)" />
        <circle cx="30" cy="40" r="25" fill="rgba(255,255,255,0.05)" />
      </svg>
      <div className={styles.emoji}>{emoji}</div>
    </div>
  )
}
