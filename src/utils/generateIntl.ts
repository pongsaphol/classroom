import intl from 'index.json'
import { getFilelist } from 'lib/api'

export const generateIntl = () => {
  const data = []
  intl.forEach((value) => {
    type Items = {
      [key: string]: any
    }

    const items: Items = value

    const ret = getFilelist(items.path)
    const classList = []
    ret.forEach(({ title, slug }) => {
      classList.push({
        link: slug,
        name: title,
      })
    })
    items['class'] = classList

    data.push(items)
  })
  return data
}
