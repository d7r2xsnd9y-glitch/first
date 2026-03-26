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
  buyUrl: string
  leaflyUrl: string
}

// Raw shape from the-cannabis-api.vercel.app
export interface APIStrain {
  strainid: number
  name: string
  type: string
  effects: string
  flavours: string
}
