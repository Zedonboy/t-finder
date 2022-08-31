import { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Input, Table } from "semantic-ui-react";
import { API_URL } from "../config";
const qs = require("qs")
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
        console.log(dx);
        dx = [{ text: "All", value: "all" }, ...dx];
        setSubjects(dx);
      }

      if (coursesResp.ok) {
        let data = await coursesResp.json();
        let dt = data.data;
        let dx = dt
          .map((d) => d.attributes)
          .map((d) => ({ text: d.name, value: d.name }));
        console.log(dx);
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
      </main> */}
      <div className="p-8">
        <SpacedDiv>
          <Dropdown
            placeholder="Select Subject"
            selection
            options={subjects}
            onChange={(e, data) => setState({ ...state, subject: data.value })}
          />
        </SpacedDiv>

        <SpacedDiv>
          <Dropdown
            placeholder="Select Course"
            selection
            options={courses}
            onChange={(e, data) => setState({ ...state, course: data.value })}
          />
        </SpacedDiv>

        <SpacedDiv>
          <Input
            placeholder="Address Or Postal Code"
            onChange={(_, { value }) => setPostalCode(value)}
          />
        </SpacedDiv>

        <Button
          primary
          onClick={(e) => {
            let task = async () => {
              let resp = await fetch(
                `${API_URL}/tutors?` +
                  qs.stringify({
                    postalCode,
                    field: "*",
                    filters: {
                      ...(function(){
                        let rslt = ""
                        if(state.course !== "all") rslt + state.course

                        if(state.subject !== "all") rslt + " " + state.subject
                        
                        return {
                          subjects: {
                            $containsi: rslt
                          }
                        }

                      }())
                    }
                  })
              );

              if (resp.ok) {
                let data = await resp.json();
                if (data && data.length > 0) {
                  setTutors(data.map(d => ({tutor: d.attributes, distance: d.distance})))
                 
                }
              }
            };

            task()
          }}
        >
          Find Tutors
        </Button>
      </div>
      {tutors.length === 0 ? null : (
        <section ref={ref} className="h-screen p-8">
          <SpacedDiv>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Phone</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Distance</Table.HeaderCell>
                  <Table.HeaderCell>Directions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {tutors.map((people) => (
                  <Table.Row>
                    <Table.Cell>
                      {people.tutor.first_name} {people.tutor.last_name}
                    </Table.Cell>
                    <Table.Cell>{people.tutor.mobile_phone}</Table.Cell>
                    <Table.Cell>{people.tutor.email}</Table.Cell>
                    <Table.Cell>
                      {Math.round(people.distance * 100) / 100} km
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        onClick={() => {
                          const url = `https://www.google.com/maps/dir/?api=1&origin=${people.currentLocation.lat},${people.currentLocation.lng}&destination=${people.tutorLocation.lat},${people.tutorLocation.lng}`;
                          window.open(url, "_blank");
                        }}
                      >
                        Go
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </SpacedDiv>
        </section>
      )}
    </>
  );
}
