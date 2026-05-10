


import React, { useContext, useState } from 'react';
import { auth } from './firebase.config';
import { GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth';
import { AuthContext } from './context';
import { ImGoogle2 } from "react-icons/im";
import { toast } from 'react-toastify';



const provider = new GoogleAuthProvider();



export const GoogleLogin = () => {
    const { setUser, axios } = useContext(AuthContext);


    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                //const credential = GoogleAuthProvider.credentialFromResult(result);
                //const token = credential.accessToken;

                // setUser(result.user);

                // console.log(result.user);

                

            })
            .catch((error) => {
                toast.error(error.message)
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };

    return (
        <button className='button-1234 flex gap-2 w-full cen-hor cursor-pointer' onClick={signInWithGoogle} style={{ cursor: 'initial' }}  >
            <ImGoogle2 />
            Enter With Google
        </button>
    );
}

