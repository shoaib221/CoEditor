import './form.css'

import React, { useState } from 'react';

export const Form = () => {
    const [error, setError] = useState(null)

    function handleSubmit () {

    }

    return (
        <form onSubmit={handleSubmit} className='w-full h-full bg-[var(--color1)]' >
            <p>{error}</p>
            <fieldset className='grid grid-cols-2' >
                <label>Email</label>
                <input type='email' name='email' placeholder='Your Email' />
                <labrl></labrl>

            </fieldset>
        </form>
    );
};




