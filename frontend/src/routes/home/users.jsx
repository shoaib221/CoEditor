import { useAuthContext } from "@/react-library/auth/context";
import { usePagination, PageTag, SearchTag } from "@/react-library/pagination/pagination2";
import { useEffect, useState } from "react"
import '../../react-library/Box/box1.css'
import { toast } from "react-toastify";


export function Users() {
    const { data, loading, page, pages, setPage, searchFor, setSearchFor, fetchData } = usePagination({ url: "/chat/users" });
    const { axiosInstance } = useAuthContext();

    async function SendFriendrequest(receiver) {
        try {
            let res = await axiosInstance.post( "/chat/send-friend-request", { receiver } );
            fetchData();
            toast.success("Friend Request Sent");
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

                        <button onClick={() => SendFriendrequest( elem )} className="hover:opacity-80" >Add as friend</button>
                    </div>
                ))}

            </div>

            <PageTag page={page} pages={pages} setPage={setPage} loading={loading} data={data} />


        </div>
    )



}