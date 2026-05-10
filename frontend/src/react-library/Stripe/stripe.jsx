import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/context';
import { useSearchParams } from 'react-router-dom';

//card  4242424242424242

export const StripeDemo = () => {
    const { axiosInstance } = useContext(AuthContext)

    async function Checkout () {
        const body = {
            cost: 100, 
            parcelName: "shoaib",
            parcelId: "wqoowp1113",
            email: "aba@gmail.com"
        }

        axiosInstance.post( "/payment/checkout-session", body )
            .then( res => window.location.href = res.data.url )
            .catch( err => console.dir(err) )
    }

    return (
        <div>
            <button onClick={Checkout} >
                Checkout
            </button>
        </div>
    );
};


export const SuccesfulPayment = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const sessionId = searchParams.get( "session_id" );
    const { axiosInstance, user } = useContext(AuthContext)

    useEffect( () => {
        if( !sessionId || !user ) return;

        axiosInstance.post( "/payment/success", { session_id: sessionId } )
            .then( res => console.log(res) )
            .catch( err => console.dir(err) )

    }, [sessionId, axiosInstance, user] )

    return (
        <div>
            Successful
        </div>
    )
}

