import { useAuthContext } from "@/react-library/auth/context";
import { usePagination, PageTag, SearchTag } from "@/react-library/pagination/pagination2";
import { useEffect, useState } from "react";
import '../../react-library/Box/box1.css';
import { toast } from "react-toastify";


export function FriendRequests() {
    const { data, loading, page, pages, setPage, searchFor, setSearchFor, fetchData } = usePagination({ url: "/chat/friend-requests" });
    const { axiosInstance } = useAuthContext();

    async function CancelRequest(sender , verdict ) {
        try {
            let res = await axiosInstance.post( "/chat/reject-request", { sender, verdict } );
            fetchData();
            toast.success("request Cancelled");
        }
        catch(err) {
            console.log(err);
            alert("error");
        }
    }


    return (
        <div className="px-2" >

            <SearchTag searchFor={searchFor} setSearchFor={setSearchFor} fetchData={fetchData} />

            <div className="flex flex-col gap-4 p-4 max-w-200 mx-auto" >

                {data && data.length > 0 && data.map((elem, i) => (
                    <div key={i} className="box-15 flex justify-between" >
                        <div>
                        
                        <div className="text-(--color4)" > {elem.name} </div>
                        <div> { elem.username } </div>
                        
                        </div>

                        <button onClick={() => CancelRequest( elem, 'rejected' )} className="hover:opacity-80" >Reject</button>
                        <button onClick={() => CancelRequest( elem, 'accepted' )} className="hover:opacity-80" >Accept</button>
                    </div>
                ))}

            </div>

            <PageTag page={page} pages={pages} setPage={setPage} loading={loading} data={data} />


        </div>
    )



}