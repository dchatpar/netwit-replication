import { createServer } from 'http'
import { readFile, stat } from 'fs/promises'
import { extname, join, normalize, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3000
const DIST = join(__dirname, 'dist')

console.log('Starting server...')
console.log('PORT:', PORT)
console.log('DIST:', DIST)

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
}

const server = createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(req.url.split('?')[0])
    if (path === '/') path = '/index.html'
    
    const filePath = normalize(join(DIST, path))
    if (!filePath.startsWith(DIST)) {
      res.writeHead(403)
      return res.end('Forbidden')
    }
    
    const stats = await stat(filePath).catch(() => null)
    if (!stats || stats.isDirectory()) {
      const fallback = join(DIST, 'index.html')
      const data = await readFile(fallback)
      res.writeHead(200, { 'Content-Type': 'text/html' })
      return res.end(data)
    }
    
    const data = await readFile(filePath)
    const type = MIME[extname(filePath)] || 'application/octet-stream'
    res.writeHead(200, { 'Content-Type': type })
    res.end(data)
  } catch (err) {
    console.error('Server error:', err)
    res.writeHead(500)
    res.end('Server error: ' + err.message)
  }
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`)
})

server.on('error', (err) => {
  console.error('Listen error:', err)
  process.exit(1)
})
