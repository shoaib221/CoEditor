import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/context";
import { FaSearch } from "react-icons/fa";
import { Loading } from "../miscel/Loading";
import '../Buttons/button.css';

//



export function usePagination({ url }) {
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [searchFor, setSearchFor] = useState("");
    const [limit, setLimit] = useState(10);
    const { axiosInstance, user } = useAuthContext();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        try {
            let res = await axiosInstance.get(`${url}?searchFor=${searchFor}&page=${page}&limit=${limit}`);
            setPages(res.data.pages);
            setData(res.data.data);
        } catch (err) {
            alert("err")
            console.dir(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!user) return;
        fetchData();
    }, [page])



    return { data, page, setPage, pages, setPages, searchFor, setSearchFor, loading, fetchData }


}



export const PageTag = ( { page, pages, setPage, loading, data } ) => {

    if(loading) return <Loading />

    if( data && data.length > 0 ) return (
        <div className="flex gap-2 justify-center" >
            { page > 1 && <div onClick={ () => setPage( prev => prev-1 ) } className="button-2" >Previous</div> }

            { [ ...Array(pages).keys() ].map( i => (
                <div key={i+1} onClick={ () => setPage(i+1) } className="button-2" >
                    {i+1}
                </div>
            ) ) }


            { page < pages && <div onClick={() => setPage( prev => prev +1 ) } className="button-2" >Next</div> }

            
        </div>
    )

    return <div className="text-center" >No data found</div>
}

export function SearchTag({  searchFor,  setSearchFor, fetchData  }) {


    return (
        <div className="flex gap-2 w-full max-w-200 px-4 rounded-2xl border-2 items-center mx-auto" >
            

            <input value={searchFor}  onChange={(e) => setSearchFor( e.target.value )} className="grow" />

            <FaSearch onClick={ () => fetchData() } />

        </div>
    )
}



function Users (  ) {
    const { data, loading, page, pages, setPage, searchBy, setSearchBy, searchFor, setSearchFor, fetchData } = usePagination11( { url: "/chat/users" } );

    const searchParams = [
        { value: 'friend', label: "Friends" },
        { value: 'others', label: "Others" }
    ]


    return (
        <div>
            
            <SearchTag searchFor={searchFor} searchBy={searchBy} setSearchBy={setSearchBy} setSearchFor={setSearchFor} searchParams={searchParams} fetchData={fetchData} />

            { data && data.length >0 && data.map( (elem, i) => (
                <div key={i}  >
                    { elem.id }
                </div>
            ) ) }

            <PageTag page={page} pages={pages} setPage={setPage} loading={loading} data={data} />

            
        </div>
    )



}

