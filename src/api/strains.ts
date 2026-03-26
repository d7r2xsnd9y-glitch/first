import type { Strain } from '../types/strain'
import { getGradient, getArtEmoji } from '../utils/colors'

interface RawStrain {
  id: number
  name: string
  type: 'indica' | 'sativa' | 'hybrid'
  thc: string
  effects: string[]
  flavors: string[]
}

const RAW: RawStrain[] = [
  // Hybrids
  { id: 1, name: 'Blue Dream', type: 'hybrid', thc: '21%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Creative', 'Uplifted'], flavors: ['Blueberry', 'Sweet', 'Berry'] },
  { id: 2, name: 'Girl Scout Cookies', type: 'hybrid', thc: '28%', effects: ['Happy', 'Relaxed', 'Euphoric', 'Uplifted', 'Creative'], flavors: ['Sweet', 'Earthy', 'Pungent'] },
  { id: 3, name: 'Gelato', type: 'hybrid', thc: '25%', effects: ['Happy', 'Relaxed', 'Euphoric', 'Uplifted', 'Creative'], flavors: ['Sweet', 'Citrus', 'Lavender'] },
  { id: 4, name: 'Wedding Cake', type: 'hybrid', thc: '27%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Uplifted', 'Hungry'], flavors: ['Sweet', 'Vanilla', 'Earthy'] },
  { id: 5, name: 'Gorilla Glue #4', type: 'hybrid', thc: '30%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Sleepy', 'Uplifted'], flavors: ['Earthy', 'Pungent', 'Pine'] },
  { id: 6, name: 'AK-47', type: 'hybrid', thc: '20%', effects: ['Happy', 'Relaxed', 'Uplifted', 'Energetic', 'Creative'], flavors: ['Earthy', 'Woody', 'Floral'] },
  { id: 7, name: 'White Widow', type: 'hybrid', thc: '20%', effects: ['Happy', 'Relaxed', 'Euphoric', 'Uplifted', 'Creative'], flavors: ['Earthy', 'Woody', 'Pungent'] },
  { id: 8, name: 'Trainwreck', type: 'hybrid', thc: '21%', effects: ['Happy', 'Relaxed', 'Euphoric', 'Uplifted', 'Creative'], flavors: ['Earthy', 'Pine', 'Lemon'] },
  { id: 9, name: 'Bruce Banner', type: 'hybrid', thc: '29%', effects: ['Happy', 'Euphoric', 'Creative', 'Energetic', 'Relaxed'], flavors: ['Diesel', 'Sweet', 'Earthy'] },
  { id: 10, name: 'Chemdawg', type: 'hybrid', thc: '24%', effects: ['Happy', 'Relaxed', 'Euphoric', 'Uplifted', 'Creative'], flavors: ['Diesel', 'Earthy', 'Pungent'] },
  { id: 11, name: 'Runtz', type: 'hybrid', thc: '29%', effects: ['Happy', 'Relaxed', 'Euphoric', 'Uplifted', 'Sleepy'], flavors: ['Sweet', 'Fruity', 'Tropical'] },
  { id: 12, name: 'Ice Cream Cake', type: 'hybrid', thc: '23%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Sleepy', 'Hungry'], flavors: ['Sweet', 'Vanilla', 'Creamy'] },
  { id: 13, name: 'Zkittlez', type: 'hybrid', thc: '23%', effects: ['Happy', 'Relaxed', 'Euphoric', 'Uplifted', 'Focused'], flavors: ['Sweet', 'Berry', 'Grape'] },
  { id: 14, name: 'Biscotti', type: 'hybrid', thc: '25%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Sleepy', 'Uplifted'], flavors: ['Sweet', 'Earthy', 'Diesel'] },
  { id: 15, name: 'Do-Si-Dos', type: 'hybrid', thc: '28%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Sleepy', 'Hungry'], flavors: ['Earthy', 'Floral', 'Sweet'] },
  { id: 16, name: 'Mimosa', type: 'hybrid', thc: '22%', effects: ['Happy', 'Uplifted', 'Energetic', 'Euphoric', 'Creative'], flavors: ['Citrus', 'Sweet', 'Tropical'] },
  { id: 17, name: 'Gary Payton', type: 'hybrid', thc: '25%', effects: ['Happy', 'Relaxed', 'Euphoric', 'Uplifted', 'Creative'], flavors: ['Earthy', 'Pepper', 'Citrus'] },
  { id: 18, name: 'Jealousy', type: 'hybrid', thc: '26%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Hungry', 'Sleepy'], flavors: ['Earthy', 'Sweet', 'Cream'] },
  { id: 19, name: 'Mac 1', type: 'hybrid', thc: '23%', effects: ['Happy', 'Euphoric', 'Relaxed', 'Uplifted', 'Creative'], flavors: ['Earthy', 'Diesel', 'Floral'] },
  { id: 20, name: 'Cereal Milk', type: 'hybrid', thc: '23%', effects: ['Happy', 'Relaxed', 'Uplifted', 'Euphoric', 'Creative'], flavors: ['Sweet', 'Creamy', 'Berry'] },

  // Indicas
  { id: 21, name: 'OG Kush', type: 'indica', thc: '23%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Uplifted', 'Hungry'], flavors: ['Earthy', 'Pine', 'Woody'] },
  { id: 22, name: 'Northern Lights', type: 'indica', thc: '18%', effects: ['Relaxed', 'Sleepy', 'Happy', 'Euphoric', 'Hungry'], flavors: ['Earthy', 'Sweet', 'Pine'] },
  { id: 23, name: 'Granddaddy Purple', type: 'indica', thc: '20%', effects: ['Relaxed', 'Sleepy', 'Happy', 'Euphoric', 'Hungry'], flavors: ['Grape', 'Berry', 'Sweet'] },
  { id: 24, name: 'Bubba Kush', type: 'indica', thc: '22%', effects: ['Relaxed', 'Sleepy', 'Happy', 'Hungry', 'Euphoric'], flavors: ['Earthy', 'Sweet', 'Coffee'] },
  { id: 25, name: 'Purple Punch', type: 'indica', thc: '20%', effects: ['Relaxed', 'Happy', 'Sleepy', 'Euphoric', 'Hungry'], flavors: ['Sweet', 'Grape', 'Blueberry'] },
  { id: 26, name: 'Kosher Kush', type: 'indica', thc: '25%', effects: ['Relaxed', 'Sleepy', 'Happy', 'Hungry', 'Euphoric'], flavors: ['Earthy', 'Pine', 'Lemon'] },
  { id: 27, name: 'Forbidden Fruit', type: 'indica', thc: '26%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Sleepy', 'Hungry'], flavors: ['Tropical', 'Cherry', 'Citrus'] },
  { id: 28, name: 'Hindu Kush', type: 'indica', thc: '20%', effects: ['Relaxed', 'Sleepy', 'Happy', 'Hungry', 'Euphoric'], flavors: ['Earthy', 'Sweet', 'Sandalwood'] },
  { id: 29, name: 'Blueberry', type: 'indica', thc: '20%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Sleepy', 'Uplifted'], flavors: ['Blueberry', 'Sweet', 'Berry'] },
  { id: 30, name: 'Skywalker OG', type: 'indica', thc: '26%', effects: ['Relaxed', 'Sleepy', 'Happy', 'Euphoric', 'Hungry'], flavors: ['Earthy', 'Pine', 'Spicy'] },
  { id: 31, name: 'Death Star', type: 'indica', thc: '22%', effects: ['Relaxed', 'Sleepy', 'Happy', 'Hungry', 'Euphoric'], flavors: ['Diesel', 'Earthy', 'Sweet'] },
  { id: 32, name: 'Sunset Sherbet', type: 'indica', thc: '21%', effects: ['Happy', 'Relaxed', 'Euphoric', 'Uplifted', 'Creative'], flavors: ['Sweet', 'Berry', 'Citrus'] },
  { id: 33, name: 'Platinum OG', type: 'indica', thc: '24%', effects: ['Relaxed', 'Sleepy', 'Happy', 'Euphoric', 'Hungry'], flavors: ['Earthy', 'Pine', 'Kush'] },
  { id: 34, name: 'LA Confidential', type: 'indica', thc: '25%', effects: ['Relaxed', 'Sleepy', 'Happy', 'Euphoric', 'Hungry'], flavors: ['Earthy', 'Pine', 'Woody'] },
  { id: 35, name: 'Afghani', type: 'indica', thc: '21%', effects: ['Relaxed', 'Sleepy', 'Happy', 'Hungry', 'Euphoric'], flavors: ['Earthy', 'Sweet', 'Pungent'] },

  // Sativas
  { id: 36, name: 'Sour Diesel', type: 'sativa', thc: '26%', effects: ['Happy', 'Energetic', 'Uplifted', 'Euphoric', 'Creative'], flavors: ['Diesel', 'Earthy', 'Pungent'] },
  { id: 37, name: 'Jack Herer', type: 'sativa', thc: '23%', effects: ['Happy', 'Energetic', 'Creative', 'Uplifted', 'Focused'], flavors: ['Earthy', 'Pine', 'Woody'] },
  { id: 38, name: 'Durban Poison', type: 'sativa', thc: '20%', effects: ['Happy', 'Energetic', 'Uplifted', 'Euphoric', 'Creative'], flavors: ['Earthy', 'Sweet', 'Pine'] },
  { id: 39, name: 'Pineapple Express', type: 'sativa', thc: '25%', effects: ['Happy', 'Energetic', 'Uplifted', 'Creative', 'Euphoric'], flavors: ['Pineapple', 'Sweet', 'Tropical'] },
  { id: 40, name: 'Purple Haze', type: 'sativa', thc: '20%', effects: ['Happy', 'Energetic', 'Creative', 'Uplifted', 'Euphoric'], flavors: ['Earthy', 'Sweet', 'Berry'] },
  { id: 41, name: 'Green Crack', type: 'sativa', thc: '24%', effects: ['Energetic', 'Happy', 'Uplifted', 'Creative', 'Focused'], flavors: ['Earthy', 'Citrus', 'Sweet'] },
  { id: 42, name: 'Super Lemon Haze', type: 'sativa', thc: '22%', effects: ['Energetic', 'Happy', 'Uplifted', 'Creative', 'Focused'], flavors: ['Lemon', 'Citrus', 'Sweet'] },
  { id: 43, name: 'Amnesia Haze', type: 'sativa', thc: '22%', effects: ['Happy', 'Energetic', 'Creative', 'Uplifted', 'Euphoric'], flavors: ['Earthy', 'Citrus', 'Lemon'] },
  { id: 44, name: 'Strawberry Cough', type: 'sativa', thc: '23%', effects: ['Happy', 'Uplifted', 'Energetic', 'Creative', 'Euphoric'], flavors: ['Strawberry', 'Sweet', 'Berry'] },
  { id: 45, name: 'Candyland', type: 'sativa', thc: '24%', effects: ['Happy', 'Uplifted', 'Energetic', 'Creative', 'Focused'], flavors: ['Sweet', 'Earthy', 'Woody'] },
  { id: 46, name: 'Tangie', type: 'sativa', thc: '22%', effects: ['Happy', 'Uplifted', 'Creative', 'Energetic', 'Euphoric'], flavors: ['Citrus', 'Orange', 'Sweet'] },
  { id: 47, name: 'Super Silver Haze', type: 'sativa', thc: '23%', effects: ['Happy', 'Energetic', 'Uplifted', 'Creative', 'Euphoric'], flavors: ['Earthy', 'Citrus', 'Sweet'] },
  { id: 48, name: 'Lemon Haze', type: 'sativa', thc: '20%', effects: ['Happy', 'Energetic', 'Uplifted', 'Creative', 'Euphoric'], flavors: ['Lemon', 'Citrus', 'Sweet'] },
  { id: 49, name: 'Ghost Train Haze', type: 'sativa', thc: '27%', effects: ['Happy', 'Euphoric', 'Creative', 'Energetic', 'Uplifted'], flavors: ['Earthy', 'Citrus', 'Floral'] },
  { id: 50, name: 'Maui Wowie', type: 'sativa', thc: '20%', effects: ['Happy', 'Energetic', 'Uplifted', 'Creative', 'Euphoric'], flavors: ['Tropical', 'Sweet', 'Pineapple'] },
  // More hybrids and popular strains
  { id: 51, name: 'Gelato 41', type: 'hybrid', thc: '26%', effects: ['Happy', 'Relaxed', 'Euphoric', 'Uplifted', 'Hungry'], flavors: ['Sweet', 'Citrus', 'Creamy'] },
  { id: 52, name: 'Lemon Cherry Gelato', type: 'hybrid', thc: '29%', effects: ['Happy', 'Relaxed', 'Euphoric', 'Uplifted', 'Creative'], flavors: ['Lemon', 'Cherry', 'Sweet'] },
  { id: 53, name: 'Banana Kush', type: 'hybrid', thc: '22%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Sleepy', 'Uplifted'], flavors: ['Banana', 'Sweet', 'Tropical'] },
  { id: 54, name: 'Grape Ape', type: 'indica', thc: '21%', effects: ['Relaxed', 'Sleepy', 'Happy', 'Euphoric', 'Hungry'], flavors: ['Grape', 'Berry', 'Earthy'] },
  { id: 55, name: 'Tropicana Cookies', type: 'sativa', thc: '25%', effects: ['Happy', 'Uplifted', 'Energetic', 'Euphoric', 'Creative'], flavors: ['Citrus', 'Orange', 'Tropical'] },
  { id: 56, name: 'Black Runtz', type: 'hybrid', thc: '26%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Uplifted', 'Sleepy'], flavors: ['Sweet', 'Fruity', 'Grape'] },
  { id: 57, name: 'Pink Runtz', type: 'hybrid', thc: '23%', effects: ['Happy', 'Relaxed', 'Euphoric', 'Uplifted', 'Hungry'], flavors: ['Sweet', 'Fruity', 'Candy'] },
  { id: 58, name: 'Mango Kush', type: 'indica', thc: '20%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Uplifted', 'Hungry'], flavors: ['Mango', 'Sweet', 'Tropical'] },
  { id: 59, name: 'Obama Runtz', type: 'indica', thc: '26%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Sleepy', 'Hungry'], flavors: ['Sweet', 'Earthy', 'Fruity'] },
  { id: 60, name: 'Watermelon Zkittlez', type: 'indica', thc: '23%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Sleepy', 'Hungry'], flavors: ['Watermelon', 'Sweet', 'Berry'] },
  { id: 61, name: 'Modified Grapes', type: 'indica', thc: '24%', effects: ['Relaxed', 'Sleepy', 'Happy', 'Euphoric', 'Hungry'], flavors: ['Grape', 'Earthy', 'Diesel'] },
  { id: 62, name: 'London Pound Cake', type: 'indica', thc: '29%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Sleepy', 'Hungry'], flavors: ['Sweet', 'Berry', 'Earthy'] },
  { id: 63, name: 'Gushers', type: 'hybrid', thc: '21%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Uplifted', 'Sleepy'], flavors: ['Sweet', 'Fruity', 'Tropical'] },
  { id: 64, name: 'Sherblato', type: 'hybrid', thc: '24%', effects: ['Happy', 'Relaxed', 'Euphoric', 'Uplifted', 'Creative'], flavors: ['Sweet', 'Berry', 'Citrus'] },
  { id: 65, name: 'Oreoz', type: 'hybrid', thc: '33%', effects: ['Relaxed', 'Happy', 'Euphoric', 'Sleepy', 'Hungry'], flavors: ['Sweet', 'Chocolate', 'Earthy'] },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export async function fetchAllStrains(): Promise<Strain[]> {
  const strains: Strain[] = RAW.map(r => {
    const slug = r.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    return {
      id: r.id,
      name: r.name,
      type: r.type,
      effects: r.effects,
      flavors: r.flavors,
      artEmoji: getArtEmoji(r.name, r.type),
      artColors: getGradient(r.name, r.type),
      thcRange: r.thc,
      buyUrl: `https://www.dopestgenetics.com/search?q=${encodeURIComponent(r.name)}`,
      leaflyUrl: `https://www.leafly.com/strains/${slug}`,
    }
  })
  return shuffle(strains)
}
