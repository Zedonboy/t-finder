/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
// import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function FindHero() {
  return (
    <div className="relative overflow-hidden bg-gray-800">
      <div
        className="hidden sm:absolute sm:inset-0 sm:block"
        aria-hidden="true"
      >
        <svg
          className="absolute bottom-0 right-0 mb-48 translate-x-1/2 transform text-gray-700 lg:top-0 lg:mt-28 lg:mb-0 xl:translate-x-0 xl:transform-none"
          width={364}
          height={384}
          viewBox="0 0 364 384"
          fill="none"
        >
          <defs>
            <pattern
              id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width={364}
            height={384}
            fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
          />
        </svg>
      </div>
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
                <div>
                  <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                    Data to enrich your online business
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                    qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                    occaecat fugiat aliqua ad ad non deserunt sunt.
                  </p>
                  <p className="mt-8 text-base font-semibold text-white sm:mt-10">
                    Used by
                  </p>
                  <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                    <div className="flex flex-wrap items-start justify-between">
                      <div className="flex justify-center px-1">
                        <img
                          className="h-9 sm:h-10"
                          src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                          alt="Tuple"
                        />
                      </div>
                      <div className="flex justify-center px-1">
                        <img
                          className="h-9 sm:h-10"
                          src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                          alt="Workcation"
                        />
                      </div>
                      <div className="flex justify-center px-1">
                        <img
                          className="h-9 sm:h-10"
                          src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                          alt="StaticKit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
                <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-8 sm:px-10">
                    <div className="relative mt-6">
                     
                    </div>

                    <div className="mt-6">
                      <form action="#" method="POST" className="space-y-6">
                        <div>
                          <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Location
                          </label>
                          <select
                            id="location"
                            name="location"
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            defaultValue="Canada"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Location
                          </label>
                          <select
                            id="location"
                            name="location"
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            defaultValue="Canada"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <div className="mt-1">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="you@example.com"
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Find Tutor
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
