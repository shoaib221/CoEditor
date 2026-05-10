import { use, useEffect, useState } from "react";
import { useAuthContext } from "@/react-library/auth/context";
import { useUpdateScholarship } from "./scholarshipHook.jsx";
import { AdminRoute } from "@/react-library/auth/RestrictedRoutes.jsx";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { Loading } from "@/react-library/miscel/Loading.jsx";


export const ManageScholarships = () => {
    const [scholarships, setScholarships] = useState(null);
    const { axiosInstance } = useAuthContext();
    const navigate = useNavigate();
    const [searchBy, setSearchBy] = useState("");
    const [searchPattern, setSearchPattern] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const { UpdateTag, showUpdate } = useUpdateScholarship()

    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [totalPages])

    useEffect(() => {
        SearchScholarships();
    }, [page])

    async function SearchScholarships() {
        try {
            console.log("search scholarships")
            let response = await axiosInstance.get(`/scholarship/all?searchBy=${searchBy}&searchPattern=${searchPattern}&page=${page}&limit=${limit}`);
            setScholarships(response.data.scholarships);
            setTotalPages(response.data.totalPages);
            console.log(response.data)
            console.log("Successfully fetched")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <AdminRoute>
            <div>

                <UpdateTag refetch={SearchScholarships} />




                <div className='flex justify-center' >

                    <span className='flex gap-2 items-center px-2 justify-center bg-(--color4) text-(--color1) rounded-lg' >
                        <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}
                        >
                            <option className="bg-(--color4) text-(--color1)" value="" >Search By</option>
                            <option className="bg-(--color4) text-(--color1)" value="scholarshipName" >Scholarhip Name</option>
                            <option className="bg-(--color4) text-(--color1)" value="universityName" >University Name</option>
                            <option className="bg-(--color4) text-(--color1)" value="degree" >Degree</option>
                            <option className="bg-(--color4) text-(--color1)" value="scholarshipCategory" >Scholarship Category</option>
                            <option className="bg-(--color4) text-(--color1)" value="subjectCategory" >Subject Category</option>
                            <option className="bg-(--color4) text-(--color1)" value="country" >Country</option>
                        </select>


                        <input className='flex-1 min-w-24' placeholder='Search for...' value={searchPattern} onChange={(e) => setSearchPattern(e.target.value)} />

                        <FaSearch title="Submit" onClick={SearchScholarships} className='text-2xl text-(--color1) cursor-pointer min-w-8' />
                    </span>
                </div>



                <div className='mt-4 flex flex-col gap-4' >
                    {scholarships ? scholarships.map((scholarship) => (
                        <div key={scholarship._id} className='box-1212 p-4 rounded-lg flex justify-between items-center' >
                            <div>
                                <div className='font-semibold text-lg text-(--color4)' >{scholarship.scholarshipName}</div>
                                <div className='text-sm text-(--color2)' >{scholarship.universityName}</div>
                            </div>
                            <div className="flex gap-2" >
                                <button className='button-1234' onClick={() => showUpdate(scholarship, true, SearchScholarships)} >Manage</button>
                            </div>
                        </div>
                    ))
                        :
                        <Loading />
                    }
                </div>

                <br />
                {totalPages > 0 && <div className='flex gap-2 flex-wrap justify-center items-center' >
                    {page > 1 && <div className='button-1234' onClick={() => setPage(x => x - 1)} > Previuos </div>}
                    {[...Array(totalPages).keys()].map(i => (
                        <div key={i} className={`p-1 min-w-12 cursor-pointer cen-hor ${i + 1 === page && 'button-91'}`} onClick={() => setPage(i + 1)} >
                            {i + 1}
                        </div>
                    ))}
                    {page < totalPages && <div className='button-1234' onClick={() => setPage(x => x + 1)} >Next</div>}
                </div>}

                <br />
            </div>
        </AdminRoute>
    )
}