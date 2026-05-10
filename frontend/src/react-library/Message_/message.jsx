import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/context';
import { useAxios } from '../axios/axios'




export const Message = () => {
    const { user } = useContext(AuthContext)
    const [message, setMessage] = useState('')
    const { axiosInstance } = useAxios()


    function sendMessage() {
        axiosInstance.post('test', { message: 'hello' }).then(res => {
            //console.log(res.data)
        }).catch(error => {
            //console.dir(error)
        })
    }


    return (
        <div>
            <label >Hello</label>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Type Your Message' />
            <button onClick={sendMessage} >Send</button>
        </div>
    );
};

