
export default function MaterialCard({name, url}) {
    return (
      <a href={url} target="_blank" className="border-2 border-indigo-600 hover:text-indigo-500 flex items-center justify-between rounded-md p-4 ">
        <div>
          {name}
        </div>
  
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>

        </div>
      </a>
    );
  }
  