import React, { useEffect, useState } from 'react';







export const Form = () => {
    const [error, setError] = useState(null)
    const [messages, setMessages] = useState([])

    function handleSubmit (e) {
        e.preventDefault();
        let msg = e.target.email.value;
        fetch('http://localhost:4000/message/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" }, // JSON header
            body: JSON.stringify( { message: msg } )
            
        }).then(data => data.json()).then(res => {
            //console.log(res);
            setMessages( [ ...messages, res ] );
        })
    }

    return (
        <div>
        <form onSubmit={handleSubmit} className='w-full h-full bg-[var(--color1)]' >
            <p>{error}</p>
            <fieldset className='grid grid-cols-2' >
                <label>Email</label>
                <input type='text' name='email' placeholder='Your Email' />
                

            </fieldset>
            <button>Submit</button>
        </form>

            { messages && <div>
                { messages.map( x => <div key={x._id} >{x.text}</div> ) }
            </div>}
        </div>
    );
};




export const Home = () => {
    

    
        
    

    useEffect(() => {
        
    }, [])

    return (
        <>
            <Form />
        </>
    );
};

