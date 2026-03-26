import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useSpring, animated, to } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import type { Strain } from '../../../types/strain'
import type { SwipeDirection } from '../../../hooks/useDeck'
import StrainArt from '../StrainArt/StrainArt'
import styles from './StrainCard.module.css'

const SWIPE_THRESHOLD = 120
const VELOCITY_THRESHOLD = 0.5
const FLY_DISTANCE = 700

export interface StrainCardRef {
  triggerSwipe: (direction: SwipeDirection) => void
}

interface Props {
  strain: Strain
  isTop: boolean
  stackOffset: number  // 0 = top, 1 = middle, 2 = bottom
  onSwipe?: (direction: SwipeDirection, strain: Strain) => void
}

const StrainCard = forwardRef<StrainCardRef, Props>(function StrainCard(
  { strain, isTop, stackOffset, onSwipe },
  ref
) {
  const gone = useRef(false)

  const [{ x, y, rotate, scale }, api] = useSpring(() => ({
    x: 0,
    y: stackOffset * 10,
    rotate: 0,
    scale: 1 - stackOffset * 0.04,
    config: { tension: 280, friction: 30 },
  }))

  // Animate to new stack position when stackOffset changes
  useEffect(() => {
    if (!gone.current) {
      api.start({
        y: stackOffset * 10,
        scale: 1 - stackOffset * 0.04,
      })
    }
  }, [stackOffset, api])

  useImperativeHandle(ref, () => ({
    triggerSwipe(direction: SwipeDirection) {
      if (gone.current) return
      gone.current = true
      const flyX = direction === 'right' ? FLY_DISTANCE : -FLY_DISTANCE
      api.start({
        x: flyX,
        rotate: flyX / 20,
        scale: 1,
        config: { tension: 200, friction: 20 },
        onRest: () => onSwipe?.(direction, strain),
      })
    },
  }))

  const bind = useDrag(
    ({ movement: [mx, my], velocity: [vx], direction: [dx], last, cancel }) => {
      if (!isTop || gone.current) {
        cancel()
        return
      }
      if (last) {
        const shouldFly =
          Math.abs(mx) > SWIPE_THRESHOLD || Math.abs(vx) > VELOCITY_THRESHOLD
        if (shouldFly) {
          gone.current = true
          const dir: SwipeDirection =
            mx > 0 || (Math.abs(mx) <= SWIPE_THRESHOLD && dx > 0)
              ? 'right'
              : 'left'
          const flyX = dir === 'right' ? FLY_DISTANCE : -FLY_DISTANCE
          api.start({
            x: flyX,
            y: my,
            rotate: flyX / 20,
            scale: 1,
            config: { tension: 200, friction: 20 },
            onRest: () => onSwipe?.(dir, strain),
          })
        } else {
          api.start({ x: 0, y: stackOffset * 10, rotate: 0, scale: 1 - stackOffset * 0.04 })
        }
      } else {
        api.start({ x: mx, y: my, rotate: mx / 20, scale: 1.02, immediate: true })
      }
    },
    { filterTaps: true, rubberband: true }
  )

  const likeOpacity = x.to(v => Math.max(0, Math.min(1, v / 80)))
  const nopeOpacity = x.to(v => Math.max(0, Math.min(1, -v / 80)))

  const effectsToShow = strain.effects.slice(0, 4)
  const flavorsToShow = strain.flavors.slice(0, 3)
  const typeColor =
    strain.type === 'indica' ? '#a78bfa' : strain.type === 'sativa' ? '#fbbf24' : '#34d399'

  return (
    <animated.div
      {...(isTop ? bind() : {})}
      className={styles.card}
      style={{
        x,
        y,
        rotate: to([rotate], r => `${r}deg`),
        scale,
        zIndex: 3 - stackOffset,
        pointerEvents: isTop ? 'auto' : 'none',
      }}
    >
      <animated.div className={styles.likeOverlay} style={{ opacity: likeOpacity }}>
        LIKE
      </animated.div>
      <animated.div className={styles.nopeOverlay} style={{ opacity: nopeOpacity }}>
        NOPE
      </animated.div>

      <StrainArt emoji={strain.artEmoji} colors={strain.artColors} name={strain.name} />

      <div className={styles.body}>
        <div className={styles.header}>
          <h2 className={styles.name}>{strain.name}</h2>
          <span className={styles.typeBadge} style={{ color: typeColor, borderColor: typeColor }}>
            {strain.type}
          </span>
        </div>

        <div className={styles.thcRow}>
          <span className={styles.thcLabel}>THC</span>
          <span className={styles.thcValue}>{strain.thcRange}</span>
        </div>

        {effectsToShow.length > 0 && (
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Effects</span>
            <div className={styles.pills}>
              {effectsToShow.map(e => (
                <span key={e} className={styles.pill}>{e}</span>
              ))}
              {strain.effects.length > 4 && (
                <span className={styles.pillMore}>+{strain.effects.length - 4}</span>
              )}
            </div>
          </div>
        )}

        {flavorsToShow.length > 0 && (
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Flavors</span>
            <div className={styles.pills}>
              {flavorsToShow.map(f => (
                <span key={f} className={`${styles.pill} ${styles.flavorPill}`}>{f}</span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.links}>
          <a
            href={strain.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buyLink}
            onClick={e => e.stopPropagation()}
          >
            🛒 Buy at Dopest Genetics
          </a>
          <a
            href={strain.leaflyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoLink}
            onClick={e => e.stopPropagation()}
          >
            More Info
          </a>
        </div>
      </div>
    </animated.div>
  )
})

export default StrainCard
