import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { renderMarkdown } from 'lib/renderMarkdown'
import { getString } from 'utils/getString'
import { getMarkdown } from 'lib/api'
import { Nav } from 'components/Nav'
import { generateIntl } from 'utils/generateIntl'

interface Data {
  url: string[]
  html: string
  className: string
  name: string
  intl: Object
}

const Pages = (props: Data) => {
  const { url, html, className, name, intl } = props
  if (url === [] || url === undefined) {
    return (
      <Nav url={[]} intl={intl}>
        <div></div>
      </Nav>
    )
  }
  return (
    <React.Fragment>
      <Nav url={url} intl={intl}>
        <div className="pt-2 pb-6 md:py-6">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-4xl font-semibold text-gray-900 text-center">
              {className}
            </h1>
            <h1 className="text-3xl font-semibold text-gray-900 mt-4 text-center">
              {name}
            </h1>
          </div>
          <div className="flex max-w-5xl mx-auto px-4 sm:px-6 md:px-8 justify-center">
            <article className="prose lg:prose-lg overflow-x-scroll">
              <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </article>
          </div>
        </div>
      </Nav>
    </React.Fragment>
  )
}

export default Pages

export const getStaticPaths: GetStaticPaths = async () => {
  const intl = generateIntl()
  const ret = []
  intl.forEach((value) => {
    value.class.forEach((data) => {
      ret.push(data.link)
    })
  })

  return {
    paths: ret.map((id: string[]) => {
      return { params: { id } }
    }),
    fallback: false,
  }
}

// From this, I will generate md list from getStaticProps

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  const intl = generateIntl()
  let className = '',
    name = ''
  intl.forEach((val) => {
    val.class.forEach((data) => {
      if (JSON.stringify(data.link) === JSON.stringify(id)) {
        className = val.className
        name = data.name
      }
    })
  })
  if (className === '') {
    return {
      props: {
        url: [],
        html: [],
      },
      revalidate: 60,
    }
  }
  let markdown = ''
  try {
    markdown = getMarkdown(getString(id as string[])).content as string
  } catch {
    markdown = getMarkdown(getString(['test'])).content as string
  }
  const html = await renderMarkdown(markdown)
  return {
    props: {
      url: id,
      html,
      className,
      name,
      intl,
    },
    revalidate: 60,
  }
}
