
export default function Hero() {
  return (
    <div className="relative overflow-hidden h-screen flex justify-center items-center w-screen bg-gray-50">
     
      <div className="relative pt-6 pb-16 sm:pb-24">
      
        <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline"></span>{' '}
              <span className="block text-indigo-600 xl:inline">Tutorone</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
             Where education meets technology, tutorone is a platform where tutors meets the needs and learning challenges of students.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="/board"
                  className="flex w-full items-center hover:text-white justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                >
                  Find Jobs
                </a>
              </div>
              {/* <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-indigo-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"
                >
                  Live demo
                </a>
              </div> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
