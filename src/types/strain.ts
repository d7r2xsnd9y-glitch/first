export type StrainType = 'indica' | 'sativa' | 'hybrid'

export interface Strain {
  id: number
  name: string
  type: StrainType
  effects: string[]
  flavors: string[]
  artEmoji: string
  artColors: [string, string]
  thcRange: string
  imageUrl: string   // Leafly CDN image, may 404 for obscure strains
  buyUrl: string
  leaflyUrl: string
}
