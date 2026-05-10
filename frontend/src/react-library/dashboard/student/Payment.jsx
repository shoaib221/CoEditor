import { useSearchParams } from "react-router-dom";
import { AuthContext, useAuthContext } from "../../auth/context";
import { useEffect } from "react";


export const SuccesfulPayment = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const sessionId = searchParams.get( "session_id" );
    const { axiosInstance, user } = useAuthContext()

    useEffect( () => {
        if( !sessionId || !user ) return;

        axiosInstance.post( "/scholarship/payment-success", { session_id: sessionId } )
            .then( res => console.log(res) )
            .catch( err => console.dir(err) )

    }, [sessionId, axiosInstance, user] )

    return (
        <div>
            Successful
        </div>
    )
}


export const FailedPayment = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const sessionId = searchParams.get( "session_id" );
    const { axiosInstance, user } = useAuthContext()

    useEffect( () => {
        if( !sessionId || !user ) return;

        axiosInstance.post( "/scholarship/payment-fail", { session_id: sessionId } )
            .then( res => console.log(res) )
            .catch( err => console.dir(err) )

    }, [sessionId, axiosInstance, user] )

    return (
        <div>
            Failed
        </div>
    )
}