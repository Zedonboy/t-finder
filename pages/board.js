import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import JobBoardTable from "../components/Table";
import { API_URL } from "../config";

export default function Board() {

    let [jobs, setJob] = useState([])
    useEffect(() => {
        let task = async () => {
            let resp = await fetch(`${API_URL}/jobs?populate=*`)
            if(resp.ok){
                let data = await resp.json()
                setJob(data.data)
            }
          
        }

        task()
        
    })
    return (
        <section className="p-4">
            <JobBoardTable jobs={jobs}/>
        </section>
    )
}