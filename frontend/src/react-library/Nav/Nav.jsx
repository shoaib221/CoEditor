import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import './Nav.css';
import { useNavContext } from './context.jsx';
import { Breaker } from '../miscel/Breaker.jsx';
import { FaGraduationCap } from "react-icons/fa6";
import { ThemeButton3, useThemeContext } from '../Theme/Theme.jsx';
import { ProfileLogo1 } from './profile.jsx';
import { TbMessageCircleHeart } from "react-icons/tb";
import { FaCode } from "react-icons/fa";


export const Logo = () => {
    return (
        <div className='h-[3rem] text-[var(--color4)] flex gap-2' >
            <FaCode className='h-full text-2xl' />
            <div className='cen-ver font-black' >CoEditor</div>
        </div>
    )
}

const ScrollToTop = () => {

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div title='Back To Top' onClick={ scrollToTop } className='fixed cen-hor text-xl bottom-4 right-4 z-30 h-10 w-10 rounded-full border-2 border-(--color1) bg-(--color4) text-(--color1)' >
            <IoArrowUpSharp  />
        </div>
    );
};


export const Nav = () => {
    const { ThemeChoice } = useThemeContext()
    const {  navi, Navigate  } = useNavContext();
    const { user, LogOut } = useAuthContext();
    const [ navBar, setNavBar ] = useState(false);

    return (
        <nav id='top' className='z-30 bg-(--color1) flex h-[3rem] justify-between p-4 items-center top-0 w-full border-(--color1a)' >
            
            <Logo />

            <div onClick={ () => Navigate('/') } className={ `oplink cursor-pointer ${ navi === '/' && 'selected' }` } >Home</div>
            
            <ProfileLogo1 />

            
        </nav>
    );
};



import { IoArrowUpSharp, IoMailSharp } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";
import { useAuthContext } from '../auth/context';


export const Footer = () => {

    return (
        <div className='py-4 bg-(--color-c4) text-white mt-16' >
            <div className='text-2xl font-bold text-center' >Connect Us</div>
            <br />

            <div className='flex flex-col lg:flex-row text-xl gap-4' >

                {/* social links */}
                <div className='lg:min-w-[40%] gap-2 grid grid-cols-[1fr_1fr] justify-center items-center pr-4' >

                    <div className='flex flex-row-reverse items-center gap-2' >
                        <FaFacebook className='inline-block mr-2' />
                        <span className='hover:underline text-sm cursor-pointer'
                            onClick={() => window.open('https://web.facebook.com/programmingHero', '_blank')} >ScholarStream</span>
                    </div>

                    <div className='flex flex-row-reverse items-center gap-2' >
                        <FaLinkedin className='inline-block mr-2' />
                        <span className='hover:underline text-sm cursor-pointer'
                            onClick={() => window.open('https://bd.linkedin.com/company/programminghero', '_blank')} >ScholarStream</span>
                    </div>

                    <div className='flex flex-row-reverse items-center gap-2' >
                        <FaPhone className='inline-block mr-2' />
                        <span className='hover:underline text-sm cursor-pointer'
                        >01303909909</span>
                    </div>

                    <div className='flex flex-row-reverse items-center gap-2' >
                        <IoMailSharp className='inline-block mr-2' />
                        <span className='hover:underline text-sm cursor-pointer'
                        >info@scholarstream.com</span>
                    </div>

                    <div className='flex flex-row-reverse items-center gap-2' >
                        <FaGlobe className='inline-block mr-2' />
                        <span className='hover:underline text-sm cursor-pointer'
                            onClick={() => window.open('https://scholarstream-shoaib221.netlify.app', '_blank')}
                        >scholarstream.com</span>
                    </div>


                </div>

                <div className='flex-grow p-2 flex flex-col items-center' >

                    <textarea placeholder='Write Your Query' rows={3} className='resize-none text-lg' />
                    <button className='font-bold text-lg button-91 my-2' >Send Message</button>

                </div>





            </div>

            <br />
            <br />

            <div style={{ textAlign: 'center', marginTop: '1rem' }} >
                Copyright © 2026 - All right reserved
            </div>
        </div>
    )
}




