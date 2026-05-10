

import React, { useRef, useState, useContext, useEffect } from 'react';
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    sendEmailVerification, sendPasswordResetEmail, updateProfile
} from 'firebase/auth';


import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from './firebase.config';
import { AuthContext } from './context';
import { GoogleLogin } from './Google';
import { GithubLogin } from './Github';
import { Breaker } from '../miscel/Breaker';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";



export const isValidemail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
export const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;



export const EmailLogin = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [forgot, setForgot] = useState(false);
    const [eye, setEye] = useState(false);


    function EyeToggle(event) {
        event.preventDefault();
        setEye(!eye);
    }

    function Login() {
        //console.log("log in")

        if (!isValidemail.test(email)) {
            toast.error('Invalid Email')
            return;
        }

        if (!isValidPassword.test(password)) {
            toast.error("Invalid Password - password must contain at least eight characters with at least a uppercase, a lowercase letters and a number")
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // if (!userCredential.user.emailVerified) {
                //     sendEmailVerification(auth.currentUser).then(() => {
                //         toast.info("Please Check Your Inbox and Verify Email")
                //     })
                //     return
                // }
                toast.success("logged in")
                navigate(location.state || '/dashboard');
            })
            .catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage)
                //console.log(error)
            });
    }


    return (
        <div className='flex flex-col justify-center items-center gap-4 w-full' >
            <div className='text-3xl font-bold text-center' >Log In </div>

            <div className='grid grid-cols-[1fr_2fr] gap-4 w-full' >
                <label className='flex justify-end items-center' >Email</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <label className='flex justify-end items-center' >Password</label>
                <div className='relative flex flex-col justify-center items-center' >
                    <input className='w-full' type={eye ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    <button className='absolute right-0' onClick={EyeToggle}  >
                        {eye ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
            </div>

            <button className='button-1234 w-full cen-hor' onClick={Login}  >Login</button>

        </div>
    )

}



export const EmailRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ photo, setPhoto ] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [eye, setEye] = useState(false);


    function Register(event) {
        event.preventDefault();
        //console.log(email, password)

        if (!isValidemail.test(email)) {
            toast.error('Invalid Email')

            return;
        }
        if (!isValidPassword.test(password)) {
            toast.error("Invalid Password - password must contain at least eight characters with at least a uppercase, a lowercase letters and a number")
            return;
        }
        //console.log("here")

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;

                // console.log( auth.currentUser , user ) same thing

                //console.log( auth.currentUser );
                // sendEmailVerification(auth.currentUser)

                let updation = { displayName: name, photoURL: photo };

                updateProfile(auth.currentUser, updation)



            }).then(() => {
                // Email verification sent!
                toast.info("Please Check Your Inbox & Verify Your Email.");
                // ...
            })
            .catch((error) => {
                toast.error(error.message)

                setError(error.message);
            });
    }

    return (
        <div className='w-full' >
            <div className='text-3xl font-bold text-center' >Register</div>
            <br />

            <div className='grid grid-cols-[1fr_2fr] gap-4' >

                <label className='flex items-center justify-end' >Name</label>
                <input type='text' required value={name} onChange={(e) => setName(e.target.value)} placeholder='Your Name' />

                <label className='flex items-center justify-end' >Photo URL</label>
                <input type='text' value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder='Photo URL' />

                <label className='flex items-center justify-end' >Email</label>
                <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />

                <label className='flex items-center justify-end' >Password</label>
                <div className='relative flex flex-col justify-center items-center' >
                    <input required className='w-full' type={eye ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    <button className='absolute right-0' onClick={() => setEye(!eye)}  >
                        {eye ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>

            </div>
            <br />
            <button className='button-1234 w-full cen-hor' onClick={Register} >Register</button>


        </div>
    )
}



export const VerifyEmail = () => {
    const [error, setError] = useState(null);
    const emailref = useRef();

    


    function PasswordReset(event) {
        let email = event.target.email.value;
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }

    function VerifyEmail(event) {
        event.preventDefault();
        //console.log( auth.currentUser );
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
                // ...
            });
    }



    return (
        <></>
    );
};


