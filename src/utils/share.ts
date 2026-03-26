import type { Strain } from '../types/strain'

function buildShareText(strains: Strain[]): string {
  const lines = strains.map(
    s => `${s.artEmoji} ${s.name} (${s.type})\n   Effects: ${s.effects.slice(0, 3).join(', ')}\n   Buy: ${s.buyUrl}`
  )
  return `🌿 My top strains on GreenSwipe:\n\n${lines.join('\n\n')}`
}

function buildSingleShareText(strain: Strain): string {
  return `${strain.artEmoji} ${strain.name} (${strain.type})\nEffects: ${strain.effects.slice(0, 3).join(', ')}\nBuy at Dopest Genetics: ${strain.buyUrl}\nMore info: ${strain.leaflyUrl}`
}

export async function shareFavorites(strains: Strain[]): Promise<'shared' | 'copied' | 'error'> {
  const text = buildShareText(strains)
  return doShare('My Strain Picks 🌿', text)
}

export async function shareStrain(strain: Strain): Promise<'shared' | 'copied' | 'error'> {
  const text = buildSingleShareText(strain)
  return doShare(`${strain.name} 🌿`, text)
}

async function doShare(title: string, text: string): Promise<'shared' | 'copied' | 'error'> {
  if (typeof navigator !== 'undefined' && navigator.share !== undefined) {
    try {
      await navigator.share({ title, text })
      return 'shared'
    } catch {
      // User cancelled or share failed — fall through to clipboard
    }
  }
  try {
    await navigator.clipboard.writeText(text)
    return 'copied'
  } catch {
    return 'error'
  }
}
