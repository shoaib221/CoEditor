import { useAuthContext } from "@/react-library/auth/context";
import { useSocketContext } from "@/react-library/socket/socket";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePagination } from '@/react-library/pagination/pagination2'
import { PageTag, SearchTag } from "@/react-library/pagination/pagination2";
import { toast } from "react-toastify";
import { useConfirmer } from "@/react-library/miscel/confirmer";
import { GroupMembers } from "./groupMembers";
import { NonMemberFriends } from "./groupNonMembers";


export const GroupSettings = (props) => {
    
    const { axiosInstance, user } = useAuthContext();
    const navigate = useNavigate();
    


    const { Tag: ConfirmDeleteTag, Init: ConfirmDeleteInit, procede: deleteProcede } = useConfirmer("Do you want to delete this group?");
    const { Tag: ConfirmLeaveTag, Init: ConfirmLeaveInit, procede: leaveProcede } = useConfirmer("Do you want leave this group?");

    useEffect(() => {
        if (!deleteProcede) return

        async function DeleteGroup() {
            try {
                await axiosInstance.post("/editor/delete-group", { group_id: props.group._id });
                toast.success("Group deleted successfully");
                navigate('/')
            } catch (err) {
                console.log(err.response.data.error);
            }
        }

        DeleteGroup()

    }, [deleteProcede, axiosInstance, props.group._id])

    useEffect(() => {
        if (!leaveProcede) return

        async function LeaveGroup() {
            try {
                await axiosInstance.post("/editor/leave-group", { group_id: props.group._id })
                toast.success("You have successfully left this group");
                navigate('/');
            } catch (err) {
                console.log(err.response.data.error)
            }
        }

        LeaveGroup();

    }, [leaveProcede, axiosInstance, props.group._id])



    return (
        <div className="grow justify-center items-center overflow-auto pt-12 pb-24 h-full bg-(--color1a) p-4" >
            
            <div className="header-11" >Members</div>
            <GroupMembers {...props} />

            <div className="h-10" ></div>

            <div className="header-11" >Add New Members</div>
            <NonMemberFriends  { ...props }  />

            <div className="h-20" ></div>

            <ConfirmDeleteTag />
            <ConfirmLeaveTag />

            <div className="flex flex-col gap-4 p-4 max-w-200 mx-auto rounded-lg border-2" >
                {props.group.admin === user.username ? <div className="flex justify-between items-center" >
                    <div>Want to delete this group ?</div>
                    <button onClick={ConfirmDeleteInit} style={{ color: "var(--color5)" }} className="hover:opacity-80 cursor-pointer" >Delete</button>
                </div> : <div className="flex justify-between items-center" >
                    <div>Want to leave this group ?</div>
                    <button onClick={ConfirmLeaveInit} style={{ color: "var(--color5)" }} className="hover:opacity-80 cursor-pointer" >Leave</button>
                </div>}
            </div>
        </div>
    )
}