import { useRouter } from "next/router";
import AvalabilityCard from "../../components/AvailabilityCard";
import MaterialCard from "../../components/MaterailCard";
import { API_URL } from "../../config";

export default function Job({job}) {
  let router = useRouter()
  let id = router.query.id
  return (
    <section className="container mx-auto px-4">
      <form>
        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Job Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
             Job #{job.id} {job.attributes.active ? (<span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Open</span>) : (<span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Closed</span>)}
            </p>
          </div>
          <a
        href={`/apply/${id}`}
        className="inline-flex mt-8 items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Apply
      </a>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Area
              </label>
              <div className="mt-1">
                <input
                  readOnly
                  type="text"
                  value={job.attributes.area}
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <div className="mt-1">
                <input
                  readOnly
                  value={job.attributes.subject}
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Level
              </label>
              <div className="mt-1">
                <input
                value={job.attributes.level}
                  readOnly
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Session Length
              </label>
              <div className="mt-1">
                <input
                value={job.attributes.session_length}
                  readOnly
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Enrollment Length
              </label>
              <div className="mt-1">
                <input
                value={job.attributes.enrollment_length}
                  readOnly
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Session per Week
              </label>
              <div className="mt-1">
                <input
                  readOnly
                  value={job.attributes.session_per_week}
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-lg font-medium text-gray-700"
              >
                Availability
              </label>
              <div className="mt-1 grid grid-cols-3 gap-2">
                {job?.attributes?.avaliability?.map((d,i) => (<AvalabilityCard key={i} day={d.day} from={d.from} to={d.to}/>))}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-lg font-medium text-gray-700"
              >
                Materials
              </label>
              <div className="mt-1 grid grid-cols-3 gap-2">
                {job?.attributes?.material?.data?.map((d,i) => (<MaterialCard key={i} url={d.attributes.url} name={d.attributes.name}/>))}
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="comment"
                className="block text-lg font-medium text-gray-700"
              >
                Student Summary
              </label>
              <article className="mt-1 prose-base" dangerouslySetInnerHTML={{
                __html: job.attributes.student_summary
              }}>
               
              </article>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export async function getServerSideProps(ctx) {
    let id = ctx.params.id
    if(isNaN(parseInt(id))) {
        return {
            notFound: true
        }
    }

    let resp = await fetch(`${API_URL}/jobs/${id}?populate=*`)
    if(resp.ok) {
        let data = await resp.json()
        
        return {
            props : {
                job: data.data
            }
        }
    } else return {
        notFound: true
    }
}
