import { useAuthContext } from "../auth/context";
import { useSocketContext } from "../socket/socket";
import "./message.css";


export const Message1 = ( { message, partner } ) => {
    const { user } = useAuthContext();
    const { onlineUsers } = useSocketContext()

    return (
        <div className={`${ message.receiver === user.username ? "received" : "sent" } max-w-[70%] p-2 rounded-full my-2 flex gap-2`} >
            <div className={`h-8 w-8 min-w-8 rounded-full border-2 bg-cover bg-top ${ onlineUsers[message.sender] && message.receiver === user.username ? 'border-green-600' : 'border-(--color1)' }`} style={{ backgroundImage: `url(${ message.receiver === user.username ? partner.photo : user.photo })` }} ></div>

            { message.type === 'text' && <p className="bg-(--color1) px-4 py-1 rounded-lg" >{message.content}</p> } 

            { message.type === 'audio' && <audio  controls>
                <source src={message.content} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio> }

            { message.type === 'video' && <video  controls>
                <source src={message.content} type="video/mp4" />
                Your browser does not support the video tag.
            </video> }

            { message.type === 'image' && <img src={message.content}  alt="message image" /> }        
            
        </div>
    )
}

// group message
export const Message2 = ( { message } ) => {
    const { user } = useAuthContext();
    const { onlineUsers } = useSocketContext()

    return (
        <div className={`${ message.sender_id.username === user.username ?  "sent" : "received"  } max-w-[70%] p-2 rounded-full my-2 flex gap-2`} >
            <div className={`h-8 w-8 min-w-8 rounded-full border-2 bg-cover bg-top ${ onlineUsers[message.sender_id.username] && message.sender_id.username !== user.username ? 'border-green-600' : 'border-(--color1)' }`} style={{ backgroundImage: `url(${ message.sender_id.photo })` }} ></div>

            { message.type === 'text' && <p className="bg-(--color1) px-4 py-1 rounded-lg" >{message.content}</p> } 

            { message.type === 'audio' && <audio  controls>
                <source src={message.content} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio> }

            { message.type === 'video' && <video  controls>
                <source src={message.content} type="video/mp4" />
                Your browser does not support the video tag.
            </video> }

            { message.type === 'image' && <img src={message.content}  alt="message image" /> }        
            
        </div>
    )
}