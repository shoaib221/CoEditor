import { useAuthContext } from "@/react-library/auth/context";
import { usePagination, PageTag, SearchTag } from "@/react-library/pagination/pagination2";
import { useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "@/react-library/socket/socket1";
import { useConfirmer } from "@/react-library/miscel/confirmer";


export function GroupMembers({ group }) {

    const { data, loading, page, pages, setPage, searchFor, setSearchFor, fetchData: refetchMembers } = usePagination({ url: `/editor/fetch-group-members/${ group._id.toString() }` });
    const { axiosInstance } = useAuthContext();
    const navigate = useNavigate();
    const { onlineUsers } = useSocketContext();
    const [friend, setFriend] = useState(null);


    async function RemoveFromGroup(member) {
        try {
            let res = await axiosInstance.post('/editor/remove-from-group', { member, group });
            await refetchMembers();
            toast.success("Member removed successfully");
        } catch (err) {
            console.log(err);
            alert("error");
        }
    }


    return (
        <div className="px-2" >


            <SearchTag searchFor={searchFor} setSearchFor={setSearchFor} fetchData={refetchMembers} />

            <div className="flex flex-col gap-4 p-4 max-w-200 mx-auto" >

                {data && data.length > 0 && data.map((elem, i) => (
                    <div key={i} className="box-16 flex justify-between items-center" >
                        <div>
                            <div className="text-(--color4) flex gap-2 items-center" >
                                {elem.name} {"  "} { onlineUsers.has(elem.username) && <div className={`h-2 w-2 rounded-full bg-green-600`} ></div> } 
                            </div>

                            <div> {elem.username} </div>
                        </div>

                        <div>
                            { elem.username === group.admin ? <div>Admin</div> : 
                            <div onClick={ () => RemoveFromGroup( elem ) } className="hover:opacity-80 cursor-pointer" >
                                Remove
                            </div> }
                        </div>
                    </div>
                ))}

            </div>

            <PageTag page={page} pages={pages} setPage={setPage} loading={loading} data={data} />

        </div>
    )



}