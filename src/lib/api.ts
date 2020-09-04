import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')

export const getMarkdown = (url: string) => {
  const fullPath = join(postsDirectory, `${url}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  type Items = {
    [key: string]: string | string[]
  }

  const items: Items = {}

  const fields = ['slug', 'title', 'order', 'content']

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = url.split('/')
    }
    if (field === 'content') {
      items[field] = content
    }
    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export const getFilelist = (nowDirectory: string) => {
  const fullPath = join(postsDirectory, nowDirectory)
  const slugs = fs.readdirSync(fullPath)
  const post = slugs
    .map((slug) => getMarkdown(`${nowDirectory}/${slug.split('.')[0]}`))
    .sort((post1, post2) => Number(post1.order) - Number(post2.order))
  return post
}
