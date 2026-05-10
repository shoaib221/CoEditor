import './form.css';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Buttons/button.css'


export const Form = () => {
    const [error, setError] = useState(null)
    const [ eye, setEye ] = useState(false)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <form  className='w-[90%] max-w-[30rem] shadow_101_1 m-4 p-4' >
            <p>{error}</p>
            <fieldset className='grid grid-cols-[1fr_2fr] gap-2' >
                <label className='flex justify-end items-center' >Email</label>
                <input type='email' name='email' placeholder='Your Email' 
                    value={email} onChange={ (e) => setEmail(e.target.value) }
                />

                <label className='flex justify-end items-center' >Password</label>
                <div  className='flex items-center justify-center relative' >
                    <input type={eye ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'  
                        className='w-full'    
                    />
                    <button className='min-w-[.5rem] absolute right-2  bg-amber-50 p-1' onClick={ (e) => { e.preventDefault(); setEye(!eye) } }  >
                        {eye ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>

            </fieldset>
            <button className='button-1'  onClick={handleSubmit} >Submit</button>
        </form>
    );
};

