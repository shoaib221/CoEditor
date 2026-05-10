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
import { usePagination } from '@/react-library/pagination/pagination2'
import { GroupSettings } from "./group_settings";


export const GroupChat = () => {
    const [messages, setMessages] = useState(null);
    const { user, axiosInstance } = useAuthContext();
    const { socket, onlineUsers } = useSocketContext();
    const { register, reset, handleSubmit, watch } = useForm();
    const { id } = useParams();
    const [partner, setPartner] = useState(null); // group
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState("message")


    let image = watch("image");
    let video = watch("video");
    let audio = watch("audio");


    async function FetchMessage() {

        setLoading(true)
        try {
            let res = await axiosInstance.get(`/chat/fetch-group-message/${id}`);
            setMessages(res.data.messages);
            setPartner(res.data.partner);
            console.log(res.data)
        } catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (!socket || !partner) return;

        console.log(partner);

        const handleReceiveMessage = (data) => {
            console.log("message received:", data);
            if (partner._id.toString() !== data.messages[0].group_id.toString()) return;

            setMessages(prev_messages => {
                let new_messages = prev_messages;
                new_messages = new_messages.concat(data.messages);
                return new_messages;
            });
        };

        socket.on("receive_group_message", handleReceiveMessage);

        return () => {
            socket.off("receive_group_message", handleReceiveMessage);
        };

    }, [socket, partner]);



    useEffect(() => {
        if (!user || !id) return;

        FetchMessage();

    }, [id, user]);


    async function SendMessage(data) {
        try {

            let new_messages = [];

            if (data.image?.length > 0) {
                for (const elem of Array.from(data.image)) {
                    const content = await uploadToCloudinary(elem, "image");
                    new_messages.push({ content, type: "image" });
                }
            }

            if (data.video?.length > 0) {
                for (const elem of Array.from(data.video)) {
                    const content = await uploadToCloudinary(elem, "video");
                    new_messages.push({ content, type: "video" });
                }
            }

            if (data.audio?.length > 0) {
                for (const elem of Array.from(data.audio)) {
                    const content = await uploadToCloudinary(elem, "audio");
                    new_messages.push({ content, type: "audio" });
                }
            }

            if (data.text) new_messages.push({ type: "text", content: data.text });

            console.log(new_messages);

            let res = await axiosInstance.post('/chat/send-group-message', { receiver: partner, messages: new_messages });

            new_messages = messages;
            new_messages = new_messages.concat(res.data.messages);

            setMessages(new_messages);
            reset();

            document.getElementById( "end-of-message" )?.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        } catch (err) {
            console.log(err);
            alert('error');
        }
    }

    if (loading) return <Loading />

    if (!partner) return <NotFound />

    return (
        <div className="relative h-[calc(100vh-60px)] grow bg-(--color1a)" >
            <div className="h-10 absolute p-2 top-0 left-0 right-0 bg-(--color1) flex z-10 gap-4 items-center  justify-between px-8" >
                <div className="flex gap-2 items-center justify-between" >
                    {partner.name}
                </div>

                <IoSettingsOutline onClick={() => setBoard(prev => prev === 'message' ? 'settings' : 'message')} className="cursor-pointer" />
            </div>

            {board === 'message' ? <div className="overflow-auto pt-12 pb-24 bg-(--color1a) p-4 flex bg-cover bg-center flex-col h-full" style={{ backgroundImage: `url(/message-back.jpg)` }} >
                {messages && messages.map(elem => <Message2 message={elem} key={elem._id} partner={partner} />)}
            </div> : <GroupSettings group={partner} members={partner?.members} admin={partner?.admin} />}

            <div id="end-of-message" ></div>

            {board === 'message' && <div className="h-24 absolute bottom-0 left-0 right-0 bg-(--color1) z-10" >
                <form onSubmit={handleSubmit(SendMessage)} className="flex gap-4 p-4 items-center absolute inset-0" >

                    <div className="rounded-full bg-(--color1) cursor-pointer w-8 h-6 relative" >
                        {image && image.length > 0 && <div className="absolute -top-6 bg-(--color4) text-(--color1) text-[.8rem] rounded-full px-[10px] py-1" > {image.length} </div>}
                        <AiOutlinePicture title="upload image" className="text-2xl  z-10 absolute inset-0 bg-(--color1)" />
                        <input type="file" multiple accept="image/*" {...register("image")} className="opacity-0 absolute inset-0 h-full w-full z-10" />
                    </div>


                    <div className="rounded-full bg-(--color1) cursor-pointer w-8 relative h-6" >

                        {video && video.length > 0 && <div className="absolute -top-6 bg-(--color4) text-(--color1) text-[.8rem] rounded-full px-[10px] py-1" > {video.length} </div>}
                        <MdOutlineSlowMotionVideo title="upload video" className="text-2xl  z-10 absolute inset-0 bg-(--color1)" />
                        <input type="file" multiple accept="video/*" {...register("video")} className="opacity-0 absolute inset-0 h-full w-full z-10" />
                    </div>



                    <div className="rounded-full bg-(--color1) cursor-pointer w-8 relative h-6" >
                        {audio && audio.length > 0 && <div className="absolute -top-6 bg-(--color4) text-(--color1) text-[.8rem] rounded-full px-[10px] py-1" > {audio.length} </div>}
                        <LuAudioLines title="upload audio" className="text-2xl  z-10 absolute inset-0 bg-(--color1)" />
                        <input type="file" multiple accept="audio/*" {...register("audio")} className="opacity-0 absolute inset-0 h-full w-full z-10" />
                    </div>



                    <textarea rows={5} placeholder="write your thoughts ..." className="grow resize-none p-2 h-20" {...register("text", { required: "" })} />


                    <button type="submit" className="bg-(--color1a) p-2 rounded-lg hover:opacity-80" >
                        Send
                    </button>

                </form>


            </div>}

        </div>
    )
}

