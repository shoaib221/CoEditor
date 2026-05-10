import { useAuthContext } from "@/react-library/auth/context";
import { uploadToCloudinary } from "@/react-library/Media/cloudinary_upload";
import { Loading } from "@/react-library/miscel/Loading";
import { Message1 } from "@/react-library/miscel/message";
import { NotFound } from "@/react-library/miscel/NotFound";
import { useSocketContext } from "@/react-library/socket/socket";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePicture } from "react-icons/ai";
import { LuAudioLines } from "react-icons/lu";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { usePagination } from '@/react-library/pagination/pagination2'
import { PageTag, SearchTag } from "@/react-library/pagination/pagination2";
import { toast } from "react-toastify";
import { useConfirmer } from "@/react-library/miscel/confirmer";


export const ChatSettings = (props) => {
    
    const { data, loading, page, pages, setPage, searchFor, setSearchFor, fetchData } = usePagination({ url: "/chat/friends" });
    const { axiosInstance, user } = useAuthContext();
    const navigate = useNavigate();
    console.log(props.partner);
    

    const { Tag: UnfriendConfirmerTag, Init: UnfriendConfirmerInit, procede: unfriendProcede } = useConfirmer("Are you sure to unfriend ?")


    useEffect(() => {
        if (!unfriendProcede || !props.partner) return;

        async function Unfriend() {
            try {
                await axiosInstance.post("/chat/unfriend", { friend: props.partner });
                toast.success("Unfriended");
                
            }
            catch (err) {
                console.log(err);
                alert("error");
            }
        }
        Unfriend()
    }, [unfriendProcede, axiosInstance])

    console.log(props.partner);



    return (
        <div className="grow justify-center items-center overflow-auto pt-12 pb-24 bg-(--color1a) p-4 h-full" >
            <UnfriendConfirmerTag />
            <div className="header-11" >  Friend's Info  </div>
            <br/>

            <span className="flex flex-col gap-4 mx-auto justify-center items-center" >
                <img src={props.partner.photo} alt="" className="w-32 h-32 rounded-full object-cover" />
                <div>{props.partner.username}</div>
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto max-w-100 w-full p-4 gap-8" >


                <div className="font-bold text-right" >Name</div>
                <div>{props.partner.name}</div>

                <div className="font-bold text-right" >Bio</div>
                <div>{props.partner.bio}</div>

                <div className="font-bold text-right" >Profession</div>
                <div>{props.partner.profession}</div>

                <div className="font-bold text-right" >Contact</div>
                <div>{props.partner.contact}</div>

                <div className="font-bold text-right" >Location</div>
                <div>{props.partner.location}</div>


                <div className="font-bold text-right" >Want to unfriend ?</div>
                <div onClick={ UnfriendConfirmerInit } className="text-(--color5) hover:opacity-80 cursor-pointer" >Unfriend</div>
            </div>

            

            
        </div>
    )
}