import fs from 'fs'
import { join } from 'path'

const postsDirectory = join(process.cwd(), '_posts')

export const getMarkdown = (url: string) => {
  const fullPath = join(postsDirectory, `${url}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return fileContents
}
