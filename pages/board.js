import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import JobBoardTable from "../components/Table";
import { API_URL } from "../config";
import qs from "qs"

export default function Board() {

    let [jobs, setJob] = useState([])
    useEffect(() => {
        let task = async () => {
            let query = qs.stringify({
                filters: {
                    active: {
                        $eq: true
                    }
                },

                populate: "*"
            })
            let resp = await fetch(`${API_URL}/jobs?${query}`)
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