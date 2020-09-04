import React, { useState } from 'react'
import Link from 'next/link'
import { Transition } from '@tailwindui/react'
import intl from '../index.json'
import { getString } from 'utils/getString'

export const Nav = ({ url, children }) => {
  const [show, setShow] = useState<boolean>(false)
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div className="md:hidden">
        <Transition show={show} className="fixed inset-0 flex z-40">
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {(ref) => (
              <div ref={ref} className="fixed inset-0">
                <div
                  onClick={() => setShow(false)}
                  className="absolute inset-0 bg-gray-600 opacity-75"
                ></div>
              </div>
            )}
          </Transition.Child>
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="relative flex-1 flex flex-col max-w-xs w-full bg-white"
          >
            {/* <div className="absolute top-0 right-0 -mr-14 p-1">
              <button
                className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                aria-label="Close sidebar"
                onClick={() => setShow(false)}
              >
                <svg
                  className="h-6 w-6 text-black"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div> */}
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center justify-center px-4">
                <img
                  className="h-16 w-auto"
                  src="https://upload.wikimedia.org/wikipedia/en/1/16/Brewster_Academy_2018_Emblem.jpg"
                  alt="Workflow"
                />
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {intl.map((value, index) => (
                  <React.Fragment key={`${index}-fragment`}>
                    <a className="mt-1 group w-full flex items-center pl-2 pr-1 py-2 text-md leading-5 font-medium rounded-md bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150">
                      {value.className}
                    </a>

                    <div className="mt-1 space-y-1 px-1">
                      {value.class.map((classWeek, id) => (
                        <Link href={'/' + getString(classWeek.link)}>
                          <a
                            className={`group w-full flex items-center pl-8 pr-2 py-2 text-large leading-5 font-medium ${
                              JSON.stringify(classWeek.link) ===
                              JSON.stringify(url)
                                ? 'text-gray-900 bg-gray-100'
                                : 'text-gray-600'
                            } rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150`}
                          >
                            {classWeek.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </nav>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* <!-- Force sidebar to shrink to fit close icon --> */}
          </div>
        </Transition>
      </div>

      {/* <!-- Static sidebar for desktop --> */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 justify-center ">
                <img
                  className="h-16 w-auto"
                  src="https://upload.wikimedia.org/wikipedia/en/1/16/Brewster_Academy_2018_Emblem.jpg"
                  alt="Workflow"
                />
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                {intl.map((value, index) => (
                  <React.Fragment>
                    <a className="mt-1 group w-full flex items-center pl-2 pr-1 py-2 text-sm leading-5 font-medium rounded-md bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150">
                      {value.className}
                    </a>
                    <div className="mt-1 space-y-1 px-1">
                      {value.class.map((classWeek) => (
                        <Link href={'/' + getString(classWeek.link)}>
                          <a
                            className={`group w-full flex items-center pl-8 pr-2 py-2 text-sm leading-5 font-medium ${
                              JSON.stringify(classWeek.link) ===
                              JSON.stringify(url)
                                ? 'text-gray-900 bg-gray-100'
                                : 'text-gray-600'
                            } rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150`}
                          >
                            {classWeek.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            onClick={() => setShow(true)}
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            aria-label="Open sidebar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
          tabIndex={0}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
