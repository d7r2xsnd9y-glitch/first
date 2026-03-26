import type { Strain, APIStrain } from '../types/strain'
import { getGradient, getArtEmoji, getThcRange } from '../utils/colors'

const BASE = 'https://the-cannabis-api.vercel.app/api/strains'

function normalize(raw: APIStrain): Strain {
  const type = (raw.type?.toLowerCase() ?? 'hybrid') as Strain['type']
  const effects = raw.effects
    ? raw.effects.split(',').map(s => s.trim()).filter(Boolean)
    : []
  const flavors = raw.flavours
    ? raw.flavours.split(',').map(s => s.trim()).filter(Boolean)
    : []
  const slug = raw.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  return {
    id: raw.strainid,
    name: raw.name,
    type,
    effects,
    flavors,
    artEmoji: getArtEmoji(raw.name, type),
    artColors: getGradient(raw.name, type),
    thcRange: getThcRange(type),
    buyUrl: `https://www.dopestgenetics.com/search?q=${encodeURIComponent(raw.name)}`,
    leaflyUrl: `https://www.leafly.com/strains/${slug}`,
  }
}

async function fetchByType(type: string): Promise<Strain[]> {
  const res = await fetch(`${BASE}/getStrainsByType/${type}`)
  if (!res.ok) throw new Error(`Failed to fetch ${type} strains`)
  const data: APIStrain[] = await res.json()
  return data.map(normalize)
}

/** Fetches all strains (indica + sativa + hybrid) and returns shuffled. */
export async function fetchAllStrains(): Promise<Strain[]> {
  const [indica, sativa, hybrid] = await Promise.all([
    fetchByType('indica'),
    fetchByType('sativa'),
    fetchByType('hybrid'),
  ])
  const all = [...indica, ...sativa, ...hybrid]
  // Fisher-Yates shuffle for variety
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[all[i], all[j]] = [all[j], all[i]]
  }
  return all
}
