import type { Strain } from '../types/strain'
import { getGradient, getArtEmoji } from '../utils/colors'
import imageMap from '../data/strain-images.json'

const IMAGE_MAP = imageMap as Record<string, string | null>

interface CannaStrain {
  id: number
  race: string
  flavors: string[]
  effects: {
    positive: string[]
    negative: string[]
    medical: string[]
  }
}

type StrainsMap = Record<string, CannaStrain>

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export async function fetchAllStrains(): Promise<Strain[]> {
  const { default: rawData } = await import('../data/strains.json')
  const map = rawData as unknown as StrainsMap
  const strains: Strain[] = Object.entries(map)
    .filter(([, v]) => v.race && ['indica', 'sativa', 'hybrid'].includes(v.race.toLowerCase()))
    .map(([name, v]) => {
      const type = v.race.toLowerCase() as Strain['type']
      const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      return {
        id: v.id,
        name,
        type,
        effects: v.effects?.positive ?? [],
        flavors: v.flavors ?? [],
        artEmoji: getArtEmoji(name, type),
        artColors: getGradient(name, type),
        thcRange: type === 'indica' ? '18–25%' : type === 'sativa' ? '20–28%' : '15–28%',
        imageUrl: IMAGE_MAP[name] ?? '',
        buyUrl: `https://www.dopestgenetics.com/search?q=${encodeURIComponent(name)}`,
        leaflyUrl: `https://www.leafly.com/strains/${slug}`,
      }
    })
  return shuffle(strains)
}
