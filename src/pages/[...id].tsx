import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import intl from '../index.json'
import Head from 'next/head'
import { renderMarkdown } from 'lib/renderMarkdown'
import { getString } from 'utils/getString'
import { getMarkdown } from 'lib/api'
import { Nav } from 'components/Nav'

const Pages = ({ url, html, className, name }) => {
  if (url === [] || url === undefined) {
    return (
      <Nav url={[]}>
        <div></div>
      </Nav>
    )
  }
  return (
    <React.Fragment>
      <Nav url={url}>
        <div className="pt-2 pb-6 md:py-6">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-4xl font-semibold text-gray-900">
              {className}
            </h1>
            <h1 className="text-3xl font-semibold text-gray-900 mt-4">
              {name}
            </h1>
          </div>
          <div className="flex max-w-5xl mx-auto px-4 sm:px-6 md:px-8 justify-center">
            <article className="prose lg:prose-lg">
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
  const ret = [['test']]

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

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
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
    markdown = getMarkdown(getString(id as string[]))
  } catch {
    markdown = getMarkdown(getString(['test']))
  }
  const html = await renderMarkdown(markdown)
  return {
    props: {
      url: id,
      html,
      className,
      name,
    },
    revalidate: 60,
  }
}
