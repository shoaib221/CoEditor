import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/context';
import { toast } from 'react-toastify';


import axios from 'axios';


const api = axios.create({
    baseURL: "http://localhost:4000"
});

// limit, skip, sort, order

export const Pagination = () => {

    const { axiosInstance } = useContext(AuthContext);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("name");
    const [order, setOrder] = useState("des");
    const [students, setStudents] = useState([]);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        if (!axiosInstance) return;
        //console.log("success")

        axiosInstance.get(`/page/students?sort=${sort}&order=${order}&limit=${limit}&page=${page}`)
            .then(res => {
                setStudents(res.data.students)
                setTotalPages(res.data.totalPages)
            })
            .catch(err => console.dir(err))


    }, [axiosInstance, sort, order, page, limit])

    return (
        <div>
            <div>Pagination</div>

            <div className='flex gap-2' >
                <select value={sort} onChange={ (e) => setSort(e.target.value) } >
                    <option value="" >Sort By</option>
                    <option value="name" >Name</option>
                    <option value="age" > Age </option>
                </select>

                <select value={order} className='flex gap-2' onChange={ (e) => setOrder(e.target.value) } >
                    <option value="" >Sort Order</option>
                    <option value="asc" >Ascending</option>
                    <option value="des" >Descending</option>
                </select>

                <select value={limit} onChange={ (e) => setLimit(e.target.value) } >
                    <option value="" >Per Page</option>
                    <option value="10" >10</option>
                    <option value="20" >20</option>
                </select>
            </div>


            <div  >
                {students && students.map(elem => (
                    <div key={elem._id} className='border p-2' > {elem.name}, {elem.age} </div>
                ))}

            </div>

            <div className='flex gap-2' >
                { page > 1 && <div className='p-1 border' onClick={ () => setPage( x => x-1 ) } > Previuos </div> }
                {totalPages && [...Array(totalPages).keys()].map(i => (
                    <div key={i} className={`p-1 ${ i+1 === page && 'border' }`} onClick={ () => setPage(i+1) } >
                        {i + 1}
                    </div>
                ))}

                { page < totalPages && <div className='p-1 border' onClick={ () => setPage( x => x+1 ) } >Next</div> }
            </div>
        </div>
    );
};

