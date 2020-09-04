import React from 'react'
import Link from 'next/link'
import intl from 'index.json'

const Index = () => (
  <div className="flex w-screen h-screen relative bg-gray-100 overflow-hidden justify-center items-center">
    <div className="relative pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
      <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
        <div className="text-center">
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
            Welcome to my <br className="xl:hidden" />
            <span className="text-blue-600">Dashboard</span>
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            This site consists of the material which I studied from the class at
            Brewster academy.
          </p>
          <div className="mt-5 max-w-md mx-auto md:mt-8">
            <div className="rounded-md shadow">
              {intl.map((value) => (
                <Link href="/[...id]" as={`/${value.path}/home`}>
                  <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10 mb-2">
                    {value.className}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
)

export default Index
