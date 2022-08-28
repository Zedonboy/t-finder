import { useEffect, useRef, useState } from "react";

export default function Home() {
  useEffect(() => {
    setTimeout(() => {
      let video = document.getElementById("video-bg");
      video.muted = true;
      video.play();
    }, 2000);
  }, []);

  let [postalCode, setPostalCode] = useState("");
  let [tutors, setTutors] = useState([]);
  let [searching, setSearching] = useState(false);
  let ref = useRef();
  return (
    <>
      <main className="h-screen w-full relative">
        <video
          id="video-bg"
          src="/video/intro.mov"
          className="w-screen h-full object-cover"
          loop
          muted
          autoPlay
        />
        <div className="absolute top-0 flex justify-center items-center bottom-0 left-0 right-0 bg-indigo-900 bg-opacity-40">
          <div>
            <div className="typewriter">
              <h1 className="text-white text-xl lg:text-4xl font-bold">
                Find Your Nearest Tutor
              </h1>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearching(true);
                let task = async () => {
                  let resp = await fetch(
                    "http://tutoronestrapi-env.eba-snq2sphf.eu-west-2.elasticbeanstalk.com/api/tutors/find-by-postal-code?" +
                      new URLSearchParams({
                        postalCode,
                      })
                  );

                  if (resp.ok) {
                    let data = await resp.json();
                    if (data && data.length > 0) {
                      setTutors(data);
                      setTimeout(() => {
                        ref.current.scrollIntoView({
                          behavior: "smooth",
                        });
                        // window.scrollBy({
                        //   top: ref.current
                        //   behavior:"smooth"
                        // })
                      }, 2000);
                    }
                  }
                };

                task().finally(() => {
                  setSearching(false);
                });
              }}
              className="mt-10"
            >
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
              >
                Search
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                  }}
                  id="default-search"
                  className="block p-4 pl-10 w-full outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                  placeholder="Postal Code"
                  required
                />
                {searching ? (
                  <svg
                    aria-hidden="true"
                    className="mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  <button
                    disabled={searching}
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
      {tutors.length === 0 ? null : (
        <div ref={ref} className="bg-white">
          <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12">
              {/* <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet our leadership</h2> */}

              <ul
                role="list"
                className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0"
              >
                {tutors.map((person, i) => (
                  <li key={i}>
                    <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
                      <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                        <img
                          className="object-cover shadow-lg rounded-lg"
                          src={person.tutor.photo}
                          alt=""
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <div className="space-y-4">
                          <div className="text-lg leading-6 font-medium space-y-1">
                            <h3>
                              {person.tutor.first_name} {person.tutor.last_name}
                            </h3>
                            <p className="text-indigo-600">
                              {person.tutor.email}
                            </p>
                            <p className="text-indigo-600">
                              {person.tutor.phone}
                            </p>
                            <p className="text-indigo-600">{person.role}</p>
                          </div>
                          <div className="text-lg">
                            <p className="text-xl font-bold">Subjects</p>
                            {/* <p className="text-gray-500">
                              {person.tutor.subjects}
                            </p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
