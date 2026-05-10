import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/context";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";




export const usePage = ({ baseURL }) => {
    const { axiosInstance } = useAuthContext();
    const [searchBy, setSearchBy] = useState("");
    const [searchPattern, setSearchPattern] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [totalPages, setTotalPages] = useState(1);
    const [jobs, setJobs] = useState(null);
    const [sortOrder, setSortOrder] = useState(-1)



    async function Search() {
        try {
            let response = await axiosInstance.get(`${baseURL}?searchBy=${searchBy}&searchPattern=${searchPattern}&page=${page}&limit=${limit}&sortBy=createdAt&sortOrder=${sortOrder}`);

            setTotalPages(response.data.totalPages);
            console.log(response.data)
            setJobs(response.data.jobs)
        } catch (err) {

            console.error(err.response.data.error)
            return null;
        }
    }

    useEffect(() => {
        Search();


    }, [page])

    return { jobs, Search, searchBy, setSearchBy, searchPattern, setSearchPattern, page, setPage, totalPages, sortOrder, setSortOrder }

}


export const SearchTag = ({ sortOrder, setSortOrder, searchBy, setSearchBy,
    searchPattern, setSearchPattern, Search
}) => {

    return (
        <div className="w-full overflow-auto py-1" >
            <div className="flex flex-nowrap gap-2 items-center px-2 py-1 w-full max-w-full overflow-x-auto">

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="min-w-32"
                >
                    <option value={-1}>Sort By</option>
                    <option value={1}>Oldest</option>
                    <option value={-1}>Newest</option>
                </select>

                <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="min-w-32"
                >
                    <option value="">Search By</option>
                    <option value="title">Job Title</option>
                    <option value="category">Job Category</option>
                    <option value="status">Job Status</option>
                </select>

                <input
                    className="min-w-32 sm:flex-1"
                    placeholder="Search for..."
                    value={searchPattern}
                    onChange={(e) => setSearchPattern(e.target.value)}
                />

                <FaSearch
                    title="Submit"
                    onClick={Search}
                    className="min-w-8 text-2xl text-[var(--color4)] cursor-pointer"
                />
            </div>
        </div>
    )
}



export const PageTag = ({ page, setPage, totalPages }) => {

    return (
        <div className='w-full flex gap-2 flex-wrap mx-auto my-2 items-center justify-center p-1' >
            {page > 1 && <div className='button-4' onClick={() => setPage(x => x - 1)} > Previuos </div>}
            {totalPages ? [...Array(totalPages).keys()].map(i => (
                <button key={i} className={`button-4 ${i + 1 === page && 'button-4a'}`} onClick={() => setPage(i + 1)} >
                    {i + 1}
                </button>
            )) 
            :
                <button className="button-4" >No such data</button>
            }
            {page < totalPages && <div className='button-4' onClick={() => setPage(x => x + 1)} >Next</div>}
        </div>
    )
}

