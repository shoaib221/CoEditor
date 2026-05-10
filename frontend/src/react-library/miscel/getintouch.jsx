import { useState } from 'react';
import { useAuthContext } from '../auth/context';
import { toast } from 'react-toastify';
import '../style/export.css'


export const GetInTouch = () => {
    const { axiosInstance } = useAuthContext()
    const [ info, setInfo ] = useState( { name: "", phone: "", email: "", message: "" } )

    async function SendMessage(params) {
        try {
            
            let res = await axiosInstance.post( '/auth/send-message', info )
            toast.success( 'Message Sent' )
            setInfo( { name: "", phone: "", email: "", message: "" } )
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="header-12 col-span-2" >Get in touch</div>
            <div className="col-span-2 text-center" >Send your query to us. We will connect you soon</div>
            <div className="grid grid-cols-[1fr_1fr] gap-2" >


                <input type='text' value={info.name} onChange={ (e) => setInfo( { ...info, name: e.target.value } ) } className="col-span-2 input-11" placeholder="Your Name" />
                <input type='number' value={ info.phone } onChange={ (e) => setInfo( { ...info, phone: e.target.value } ) } className="col-span-1 input-11" placeholder="Your Phone Number" />
                <input type='email' value={info.email} onChange={ (e) => setInfo( { ...info, email: e.target.value } ) } className="col-span-1 input-11" placeholder="Your Email" />
                <textarea  value={info.message} onChange={ (e) => setInfo( { ...info, message: e.target.value } ) }
                    className="col-span-2 input-11" rows={5} placeholder="Your Message" />

                <button className="col-span-2 button-3 mx-auto" onClick={SendMessage} >
                    Send
                </button>
            </div>
        </div>
    )
}