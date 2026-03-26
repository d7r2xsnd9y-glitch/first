// Deterministic gradient pair from strain name + type
const INDICA_PALETTES: Array<[string, string]> = [
  ['#0f0c29', '#302b63'],
  ['#1a1a2e', '#16213e'],
  ['#2d1b69', '#11998e'],
  ['#4a0e8f', '#1a1a2e'],
  ['#3a0ca3', '#560bad'],
  ['#1d0036', '#4a0080'],
  ['#0d0d2b', '#1b1464'],
]

const SATIVA_PALETTES: Array<[string, string]> = [
  ['#f7971e', '#ffd200'],
  ['#f9d423', '#ff4e50'],
  ['#f6d365', '#fda085'],
  ['#ff9a00', '#ffad00'],
  ['#ee0979', '#ff6a00'],
  ['#f7971e', '#ee0979'],
  ['#fc4a1a', '#f7b733'],
]

const HYBRID_PALETTES: Array<[string, string]> = [
  ['#667eea', '#764ba2'],
  ['#a18cd1', '#fbc2eb'],
  ['#84fab0', '#8fd3f4'],
  ['#43e97b', '#38f9d7'],
  ['#4facfe', '#00f2fe'],
  ['#0ba360', '#3cba92'],
  ['#c471f5', '#fa71cd'],
]

function hashName(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) {
    h = (Math.imul(31, h) + name.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

export function getGradient(name: string, type: string): [string, string] {
  const hash = hashName(name)
  if (type === 'indica') return INDICA_PALETTES[hash % INDICA_PALETTES.length]
  if (type === 'sativa') return SATIVA_PALETTES[hash % SATIVA_PALETTES.length]
  return HYBRID_PALETTES[hash % HYBRID_PALETTES.length]
}

const INDICA_EMOJIS = ['🌌', '💜', '🔮', '🌙', '😴', '🍇', '🫐']
const SATIVA_EMOJIS = ['☀️', '⚡', '🔥', '🌟', '🚀', '🎆', '🍋']
const HYBRID_EMOJIS = ['🌿', '💫', '✨', '🌈', '🌀', '🎯', '🪄']

export function getArtEmoji(name: string, type: string): string {
  const hash = hashName(name)
  if (type === 'indica') return INDICA_EMOJIS[hash % INDICA_EMOJIS.length]
  if (type === 'sativa') return SATIVA_EMOJIS[hash % SATIVA_EMOJIS.length]
  return HYBRID_EMOJIS[hash % HYBRID_EMOJIS.length]
}

export function getThcRange(type: string): string {
  if (type === 'indica') return '18–25%'
  if (type === 'sativa') return '20–28%'
  return '15–28%'
}
