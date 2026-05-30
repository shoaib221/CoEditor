import { useAuthContext } from "@/react-library/auth/context";
import { usePagination, PageTag, SearchTag } from "@/react-library/pagination/pagination2";
import { useEffect, useCallback, useState } from "react"

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "@/react-library/socket/socket";
import { useConfirmer } from "@/react-library/miscel/confirmer";


export function NonMemberFriends({ group }) {
    console.log(group)
    let url =  `/editor/fetch-non-members/${ group._id.toString() }`
    console.log(url)
    const { data, loading, page, pages, setPage, searchFor, setSearchFor, fetchData: refetchFriends } = usePagination({ url });
    const { axiosInstance } = useAuthContext();
    const navigate = useNavigate();
    const { onlineUsers } = useSocketContext();
    const [friend, setFriend] = useState(null);





    async function AddToGroup(new_member) {

        try {
            let res = await axiosInstance.post('/editor/add-to-group', { new_member, group });
            await refetchFriends()
            toast.success("Member added successfully")
        } catch (err) {
            console.log(err);
            alert("error");
        }
    }




    return (
        <div className="px-2" >


            <SearchTag searchFor={searchFor} setSearchFor={setSearchFor} fetchData={refetchFriends} />

            <div className="flex flex-col gap-4 p-4 max-w-200 mx-auto" >

                {data && data.length > 0 && data.map((elem, i) => (
                    <div key={i} className="box-13 flex justify-between" >
                        <div>
                            <div className="text-(--color4) flex gap-2 items-center" > {elem.name} {"  "} <div className={`h-2 w-2 rounded-full ${onlineUsers[elem.username] ? 'bg-green-600' : 'bg-(--color1)'}`} ></div> </div>
                            <div> {elem.username} </div>
                        </div>

                        <div onClick={ () => AddToGroup(elem) } >
                            Add as member
                        </div>
                    </div>
                ))}

            </div>

            <PageTag page={page} pages={pages} setPage={setPage} loading={loading} data={data} />

        </div>
    )
}