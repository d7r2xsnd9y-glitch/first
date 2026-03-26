/**
 * Pre-validates Leafly image URLs for all strains using curl and writes
 * src/data/strain-images.json  { [strainName]: url | null }
 *
 * Run: node scripts/build-image-map.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execFile } from 'child_process'
import { promisify } from 'util'

const exec = promisify(execFile)
const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const strains = JSON.parse(readFileSync(resolve(ROOT, 'src/data/strains.json'), 'utf8'))
const names = Object.keys(strains)

function toSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

async function checkUrl(url) {
  try {
    const { stdout } = await exec('curl', [
      '-s', '-o', '/dev/null',
      '-w', '%{http_code}',
      '--max-time', '6',
      '-r', '0-0',   // range: only fetch first byte
      url,
    ])
    return stdout.trim() === '200' || stdout.trim() === '206'
  } catch {
    return false
  }
}

async function findImageUrl(name) {
  const slug = toSlug(name)
  const jpg = `https://images.leafly.com/flower-images/${slug}.jpg`
  const png = `https://images.leafly.com/flower-images/${slug}.png`
  if (await checkUrl(jpg)) return jpg
  if (await checkUrl(png)) return png
  return null
}

async function processBatch(batch) {
  return Promise.all(batch.map(async name => ({ name, url: await findImageUrl(name) })))
}

const BATCH_SIZE = 15
const results = {}

console.log(`Checking ${names.length} strains via curl...`)

for (let i = 0; i < names.length; i += BATCH_SIZE) {
  const batch = names.slice(i, i + BATCH_SIZE)
  const batchResults = await processBatch(batch)
  for (const { name, url } of batchResults) {
    results[name] = url
  }
  const pct = Math.round((i + batch.length) / names.length * 100)
  const found = Object.values(results).filter(Boolean).length
  process.stdout.write(`\r${pct}% — ${found} images found`)
}

const found = Object.values(results).filter(Boolean).length
console.log(`\nDone! ${found}/${names.length} strains have images.`)
writeFileSync(resolve(ROOT, 'src/data/strain-images.json'), JSON.stringify(results, null, 2))
console.log('Written to src/data/strain-images.json')
