import { useRouter } from "next/router";
import { useState } from "react";
import { API_URL } from "../../config";
const qs = require("qs");
// import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function fetchTutor(email) {
  let query = qs.stringify({
    filters: {
      email: {
        $eq: email,
      },
    },
  });
  return fetch(`${API_URL}/tutors?${query}`);
}

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  reason: "",
  email: "",
};

export default function ApplyJob() {
  const [disable, setDisable] = useState(true);
  const [verify, setVerify] = useState(false);
  let [tutor, setTutor] = useState(INITIAL_STATE);
  let [loading, setLoading] = useState(false);
  let [nextPage, setNextPage] = useState(false)
  let [status, setStatus] = useState(null)
  let route = useRouter();

  if(nextPage) {
    return (
      <section className="w-screen h-screen flex items-center justify-center">
         <div className="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          {/* <p className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">404</p> */}
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{status.message}</h1>
              <p className="mt-1 text-base text-gray-500">{status.desc ? status.desc : "Please check the URL below."}</p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              {!status.member ? ( 
                  <a
                  href="https://tutorone.teachworks.com/form/become-a-tutor-change-lives"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Next
                </a>
               
              ) : (
                  <a
                  href="/board"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Next
                </a>
               
               )}
            
            </div>
          </div>
        </main>
      </div>
    </div>
      </section>
     
    )
  }
  return (
    <div className="overflow-hidden bg-white py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
      <div className="relative mx-auto max-w-xl">
        <svg
          className="absolute left-full translate-x-1/2 transform"
          width={404}
          height={404}
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={404}
            fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
          />
        </svg>
        <svg
          className="absolute right-full bottom-0 -translate-x-1/2 transform"
          width={404}
          height={404}
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={404}
            fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
          />
        </svg>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Apply
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            We will contact you after, if you are a good fit for this role
          </p>
        </div>
        <div className="mt-12">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);

              let task = async () => {
                let resp = await fetch(`${API_URL}/job-requests`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    data: {
                      firstName: tutor.firstName,
                      lastName: tutor.lastName,
                      job: parseInt(route.query["jid"]),
                      email: tutor.email,
                      reason: tutor.reason,
                    },
                  }),
                }).finally(() => {
                  setLoading(false);
                });

                if(resp.ok) {
                  let data = await resp.json()
                  setStatus(data)
                  setNextPage(true)
                }
              };

              task();
            }}
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          >
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  onChange={(e) => {
                    let email = e.target.value;
                    setTutor({ ...tutor, email });
                    let td;
                    if (validateEmail(email)) {
                      if (td) clearTimeout(td);
                      let task = async () => {
                        let resp = await fetchTutor(email);
                        if (resp.ok) {
                          let data = await resp.json();
                          if (data[0]) {
                            setTutor({
                              ...tutor,
                              firstName: data[0].attributes.first_name,
                              lastName: data[0].attributes.last_name,
                              email,
                            });
                            setVerify(false);
                          } else {
                            setVerify(false);
                            setDisable(false);
                          }
                        } else {
                          setVerify(false);
                          setDisable(false);
                        }
                      };
                      setVerify(true);
                      task();
                    }
                  }}
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="you@example.com"
                  aria-invalid="true"
                  aria-describedby="email-error"
                />
                {verify ? (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-500"
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
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <div className="mt-1">
                <input
                  disabled={disable}
                  type="text"
                  name="first-name"
                  id="first-name"
                  onChange={e => {
                    setTutor({...tutor, firstName: e.target.value})
                  }}
                  value={tutor.firstName}
                  autoComplete="given-name"
                  className="block w-full rounded-md disabled:bg-gray-100 border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <div className="mt-1">
                <input
                  disabled={disable}
                  type="text"
                  name="last-name"
                  id="last-name"
                  onChange={e => {
                    setTutor({...tutor, lastName: e.target.value})
                  }}
                  value={tutor.lastName}
                  autoComplete="family-name"
                  className="block w-full disabled:bg-gray-100 rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            {/* <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="organization"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div> */}

            {/* <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="h-full rounded-md border-transparent bg-transparent py-0 pl-4 pr-8 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                  </select>
                </div>
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  autoComplete="tel"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 pl-20 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="+1 (555) 987-6543"
                />
              </div>
            </div> */}
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Why are you a good fit?
              </label>
              <div className="mt-1">
                <textarea
                  onChange={(e) => {
                    setTutor({ ...tutor, reason: e.target.value });
                  }}
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={""}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center disabled:bg-indigo-400 justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Apply{" "}
                {loading ? (
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
  );
}
