import { useAuthContext } from "@/react-library/auth/context";
import { uploadToCloudinary } from "@/react-library/Media/cloudinary_upload";
import { Loading } from "@/react-library/miscel/Loading";
import { Message1, Message2 } from "@/react-library/miscel/message";
import { NotFound } from "@/react-library/miscel/NotFound";
import { useSocketContext } from "@/react-library/socket/socket";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePicture } from "react-icons/ai";
import { LuAudioLines } from "react-icons/lu";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { useParams } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { usePagination } from '@/react-library/pagination/pagination2';
import { GroupSettings } from "./group_settings";
import { MonacoEditor } from "@/exp";


export const GroupChat = () => {
    const { user, axiosInstance } = useAuthContext();
    const { id } = useParams();
    const [partner, setPartner] = useState(null); // group
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState("editor");


    async function FetchGroup() {
        try {
            let res = await axiosInstance.get(`/editor/group/${ id }`)
            setPartner( res.data.group )
        } catch(err) {
            console.log(err.response.data.error) 
        } finally {
            setLoading(false)
            console.log( "group fetched" )
        }

    }

    

    useEffect(() => {
        if (!user || !id) return;

        FetchGroup();

    }, [id, user]);


    

    if (loading) return <Loading />

    if (!partner) return <NotFound />

    return (
        <div className="grow  flex flex-col bg-(--color1a) justify-between"  >


            <div className="min-h-[2rem] flex justify-between px-8 items-center" >
                <div className="flex gap-2 items-center justify-between" >
                    {partner.name}
                </div>

                <IoSettingsOutline onClick={() => setBoard(prev => prev === 'editor' ? 'settings' : 'editor')} className="cursor-pointer" />
            </div>

            <div className="h-[calc(100vh-6rem)] border bg-red-700" >

                {board === 'editor' ? <MonacoEditor roomId={partner.roomId} /> :  <GroupSettings group={partner} /> }

            </div>

        </div>
    )
}

