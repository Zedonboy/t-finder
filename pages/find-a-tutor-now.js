import { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Input, Table } from "semantic-ui-react";
import { API_URL } from "../config";
// import "semantic-ui-css/semantic.min.css";
import Hero from "../components/Hero";
import FindHero from "../components/FinderHero";
const qs = require("qs");
const INITIAL_STATE = {
  subject: "",
  course: "",
  postalCode: "",
};
const SpacedDiv = ({ children }) => (
  <div style={{ margin: "10px 0" }}>{children}</div>
);
export default function Home() {
  useEffect(() => {
    let task = async () => {
      let subjectResp = await fetch(`${API_URL}/subjects`);
      let coursesResp = await fetch(`${API_URL}/courses`);

      if (subjectResp.ok) {
        let data = await subjectResp.json();
        let dt = data.data;
        let dx = dt
          .map((d) => d.attributes)
          .map((d) => ({ text: d.name, value: d.name }));
        dx = [{ text: "All", value: "all" }, ...dx];
        setSubjects(dx);
      }

      if (coursesResp.ok) {
        let data = await coursesResp.json();
        let dt = data.data;
        let dx = dt
          .map((d) => d.attributes)
          .map((d) => ({ text: d.name, value: d.name }));
        dx = [{ text: "All", value: "all" }, ...dx];
        setCourses(dx);
      }
    };

    task();
  }, []);

  let [postalCode, setPostalCode] = useState("");
  let [tutors, setTutors] = useState([]);
  let [searching, setSearching] = useState(false);
  let [subjects, setSubjects] = useState([]);
  let [courses, setCourses] = useState([]);
  let [state, setState] = useState(INITIAL_STATE);
  let ref = useRef();

  return (
    <>
      {/* <main className="h-screen w-full relative">
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
                    "https://finder.tutor1.ca/api/tutors/find-by-postal-code?" +
                      new URLSearchParams({
                        postalCode,
                        ...(parseInt(radius) > 0 ? {radius} : undefined)
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
              <div className="relative flex">
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
                 <input
                  type="number"
                  onChange={(e) => {
                    if(isNaN(parseInt(e.target.value))) return
                    setRadius(e.target.value)
                  }}
                  id="default-radius"
                  className="block p-4 pl-10 w-full outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                  placeholder="Radius in meters"
                  required
                />
                {searching ? (
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 20 20"
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
      */}
      <div className="relative overflow-hidden h-screen bg-gray-800">
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
                      Find a <span className="text-indigo-500">Tutor Now</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      With our advanced searching techniques you can find the nearest tutor for your ward. Tutor Finder is Where education meets technology, we are platform where tutors meets the needs and learning challenges of students.
                    </p>
                    {/* <p className="mt-8 text-base font-semibold text-white sm:mt-10">
                      Used by
                    </p> */}
                    {/* <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
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
                    </div> */}
                  </div>
                </div>
                <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
                  <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-8 sm:px-10">
                      <div className="relative mt-6"></div>

                      <div className="mt-6">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setSearching(true)
                            let task = async () => {
                              let resp = await fetch(
                                `${API_URL}/tutors?` +
                                  qs.stringify({
                                    postalCode,
                                    field: "*",
                                    filters: {
                                      ...(function () {
                                        let rslt = "";
                                        if (state.course !== "all") rslt = rslt + state.course;
                
                                        if (state.subject !== "all")
                                          rslt = rslt + " " + state.subject;
                
                                        return {
                                          subjects: {
                                            $containsi: rslt,
                                          },
                                        };
                                      })(),
                                    },
                                  })
                              );
                
                              if (resp.ok) {
                                let data = await resp.json();
                                if (data && data.length > 0) {
                                  console.log(data)
                                  setTutors(
                                    data.map((d) => ({
                                      tutor: d.attributes,
                                      distance: d.distance,
                                      currentLocation: d.currentLocation,
                                    }))
                                  );
                                }
                              }
                            };
                
                            task().then(r => {
                              ref.current.scrollIntoView({
                                behavior: "smooth",
                              });
                            }).finally(() => {
                              setSearching(false)
                            });
                          }}
                          className="space-y-6"
                        >
                          <div>
                            <label
                              htmlFor="location"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Subject
                            </label>
                            <select
                              onChange={(e) => {
                                setState({ ...state, subject: e.target.value });
                              }}
                              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              {subjects.length === 0 ? (
                                <option defaultChecked>Loading</option>
                              ) : null}
                              {subjects?.map((v) => (
                                <option value={v.value}>{v.text}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="location"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Course
                            </label>
                            <select
                              onChange={(e) => {
                                setState({ ...state, course: e.target.value });
                              }}
                              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              {courses.length === 0 ? (
                                <option defaultChecked>Loading</option>
                              ) : null}
                              {courses?.map((v) => (
                                <option value={v.value}>{v.text}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Address or Postal Code
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                onChange={(e) => {
                                  setPostalCode(e.target.value);
                                }}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Address or Postal Code"
                              />
                            </div>
                          </div>

                          <div>
                            <button
                              disabled={searching}
                              type="submit"
                              className="flex w-full disabled:bg-indigo-400 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Find Tutor
                              {searching ? (
                                <svg
                                  className="animate-spin ml-4 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                              ) : null}
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
      <section ref={ref} className="p-8">
      {tutors.length === 0 ? null : (
       
          <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="table-fixed divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Phone
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Subject
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Distance
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Vehicle
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Directions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {tutors.map((people, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {people.tutor.first_name} {people.tutor.last_name}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">{people.tutor.mobile_phone}</td>
                      <td className="px-3 py-4 text-sm text-gray-500">{people.tutor.email}</td>
                      <td className="px-3 py-4 text-sm text-gray-500">{people.tutor.subjects}</td>
                      <td className="px-3 py-4 text-sm text-gray-500"> {Math.round(people.distance * 100) / 100} km</td>
                      <td className="px-3 py-4 text-sm text-gray-500">{people.tutor["vehicle_possession"]
                        ? people.tutor["vehicle_possession"]
                        : "None"}</td>
                      <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href={`https://www.google.com/maps/dir/?api=1&origin=${people?.currentLocation?.lat},${people?.currentLocation?.lng}&destination=${people?.tutor?.lat},${people?.tutor?.lng}`} className="text-indigo-600 hover:text-indigo-900">
                          Go
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      )}
       </section>
    </>
  );
}
