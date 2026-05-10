import React, { useState } from 'react';
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin, FaFacebook, FaTwitter, FaGlobe } from "react-icons/fa";
import { TbBrandStocktwits } from "react-icons/tb";
import { Logo } from './Nav';
import { Box } from '../Box/box.jsx';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useScreenSize } from './screen-hook';
import { useNavContext } from './context';
import '../style/header1.css'


const SubFooter1 = () => {
    const [opener, setOpener] = useState(false);
    const { screen } = useNavContext()

    return (
        <div onClick={ () => setOpener( prev => !prev ) } className='box-01 grow'  >
            <div className='flex justify-between items-center gap-8' >
                <span className='header-11' >Social Links</span>
                { opener && screen.width < 1024 && <SlArrowUp /> }
                { !opener && screen.width < 1024 && <SlArrowDown /> }
            </div>
            

            {
                (opener || screen.width >1024) && <div className='flex flex-col gap-4 py-4' >
                    
                    <div className='flex gap-2 items-center' >
                        <FaFacebook></FaFacebook>
                        <a className='hover:underline' href='https://facebook.com' target="_blank" rel="noopener noreferrer" > Facebook </a> 
                    </div>

                    <div className='flex gap-2 items-center' >
                        <FaLinkedin></FaLinkedin>
                        <a className='hover:underline' href='https://linkedin.com' target="_blank" rel="noopener noreferrer" > Linkedin </a> 
                    </div>


                    <div className='flex gap-2 items-center' >
                        <FaTwitter></FaTwitter>
                        <a className='hover:underline' href='https://Twitter.com' target="_blank" rel="noopener noreferrer" > Twitter </a> 
                    </div>
                </div>
            }
        </div>
    )
}

const SubFooter2 = () => {
    const [opener, setOpener] = useState(false);
    const { screen } = useNavContext()

    return (
        <div onClick={ () => setOpener( prev => !prev ) } className='box-01 grow'  >
            <div className='flex justify-between items-center gap-8' >
                <span className='header-11' >Partners</span>
                { opener && screen.width < 1024 && <SlArrowUp /> }
                { !opener && screen.width < 1024 && <SlArrowDown /> }
            </div>
            

            {
                (opener || screen.width >1024) && <div className='flex flex-col gap-4 py-4' >
                    
                    <div className='flex gap-2 items-center' >
                        <FaGlobe />
                        <a className='hover:underline' href='https://www.ox.ac.uk/' target="_blank" rel="noopener noreferrer" > Oxford University </a> 
                    </div>

                    <div className='flex gap-2 items-center' >
                        <FaGlobe />
                        <a className='hover:underline' href='https://www.harvard.edu/' target="_blank" rel="noopener noreferrer" > Harvard University </a> 
                    </div>


                    <div className='flex gap-2 items-center' >
                        <FaGlobe />
                        <a className='hover:underline' href='https://www.sust.edu/' target="_blank" rel="noopener noreferrer" > Shahjalal University </a> 
                    </div>
                </div>
            }
        </div>
    )
}



const SubFooter3 = () => {
    const [opener, setOpener] = useState(false);
    const { screen } = useNavContext();

    return (
        <div onClick={ () => setOpener( prev => !prev ) } className='box-01 grow'  >
            <div className='flex justify-between items-center gap-8' >
                <span className='header-11' >Contacts</span>
                { opener && screen.width < 1024 && <SlArrowUp /> }
                { !opener && screen.width < 1024 && <SlArrowDown /> }
            </div>
            

            {
                (opener || screen.width >1024) && <div className='flex flex-col gap-4 py-4' >
                    
                    <div className='flex gap-2 items-center' >
                        <IoLocationSharp />
                        4/A, Chankharpul, Dhaka - 1207
                    </div>

                    <div className='flex gap-2 items-center' >
                        <FaPhoneFlip />
                        01303009009
                    </div>


                    <div className='flex gap-2 items-center' >
                        <MdEmail />
                        info@scholarstream.com
                    </div>
                </div>
            }
        </div>
    )
}



export const Footer = () => {


    return (
        <div id='footer' className='px-8 bg-(--color1a) p-8' >

            <div className='grid grid-cols-[1fr] lg:grid-cols-[1fr_1fr_1fr] gap-4' >
                <SubFooter1 />

                <SubFooter2 />

                <SubFooter3 />

            </div>

            <br/>

            <div style={{ textAlign: 'center', marginTop: '1rem' }} >
                Copyright © 2025 - All right reserved
            </div>
        </div>
    );
};

