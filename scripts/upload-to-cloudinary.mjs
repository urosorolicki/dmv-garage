/**
 * Bulk upload gallery images to Cloudinary.
 * Run: node scripts/upload-to-cloudinary.mjs
 *
 * Set env vars before running:
 *   CLOUDINARY_API_KEY=your_key
 *   CLOUDINARY_API_SECRET=your_secret
 */

import { v2 as cloudinary } from "cloudinary"
import { readdir } from "fs/promises"
import { join, extname, basename } from "path"
import { fileURLToPath } from "url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

const CLOUD_NAME = "dd9xjzu8c"
const FOLDER = "dmv-garage"

const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET

if (!API_KEY || !API_SECRET) {
  console.error("Missing env vars. Run as:")
  console.error("  CLOUDINARY_API_KEY=xxx CLOUDINARY_API_SECRET=yyy node scripts/upload-to-cloudinary.mjs")
  process.exit(1)
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
})

const IMAGES_DIR = join(__dirname, "..", "public", "images")
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".JPG", ".PNG"])

// Only upload gallery photos — skip UI assets
const SKIP_PREFIXES = ["gallery-", "hero", "logo", "chiptuning", "about", "service", "og", "favicon"]

async function main() {
  const files = await readdir(IMAGES_DIR)

  const toUpload = files.filter((f) => {
    const ext = extname(f)
    if (!ALLOWED_EXT.has(ext)) return false
    if (SKIP_PREFIXES.some((p) => f.startsWith(p))) return false
    return true
  })

  console.log(`Uploading ${toUpload.length} files to Cloudinary folder "${FOLDER}"...\n`)

  const results = []
  let done = 0

  for (const file of toUpload) {
    const filePath = join(IMAGES_DIR, file)
    // public_id = filename without extension, inside folder
    const publicId = `${FOLDER}/${basename(file, extname(file))}`

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        overwrite: false,
        resource_type: "image",
      })
      done++
      console.log(`[${done}/${toUpload.length}] OK  ${file}`)
      results.push({ file, url: result.secure_url, public_id: result.public_id })
    } catch (err) {
      console.error(`[${done}/${toUpload.length}] ERR ${file}: ${err.message}`)
    }
  }

  console.log(`\nDone. ${results.length}/${toUpload.length} uploaded.`)
  console.log("\nCloudinary base URL:")
  console.log(`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,w_1200/${FOLDER}/`)
}

main()
