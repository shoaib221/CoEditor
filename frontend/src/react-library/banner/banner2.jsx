import React from 'react';
import { useState, useEffect } from 'react';
import './banner2.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Banner2 = () => {
    const ids = ["img1", "img2", "img3"];
    const [index, setIndex] = useState(0);
    const navigate = useNavigate()

    const leftSlide = () => {

        setIndex(prev => (prev - 1 + ids.length) % ids.length)

        //console.log("left slide", index)
    }

    const rightSlide = () => {
        setIndex(prev => (prev + 1) % ids.length)
    }


    useEffect(() => {
        const interval = setInterval(() => {

            leftSlide()
        }, 4000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        < div className='w-full' >
            <div id={ids[index]} className='relative h-[15rem] lg:h-[20rem]  bg-contain bg-center bg-no-repeat'   >
                {/* <button onClick={leftSlide} className="absolute top-[10%] left-4 w-12 h-[80%] bg-white/50 text-5xl"  >
                    <MdKeyboardArrowLeft />
                </button>

                <button onClick={rightSlide} className="absolute top-[10%] right-4 w-12 h-[80%] bg-white/50 text-5xl"  >
                    <MdKeyboardArrowRight />
                </button> */}
            </div>

            <div className='relative overflow-hidden p-4' >
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: "0" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className='text-3xl font-bold'
                >
                    Grab Your {" "}
                    <span className='text-[var(--color4)]' >
                        Dream
                    </span>
                    {" "}
                    Scholarship
                </motion.div>

                <br/>

                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className='text-[var(--color3)] text-justify'
                >
                    Finding the right scholarship can be life-changing, but searching for it shouldn’t feel overwhelming. Our platform is designed to make scholarship hunting simple, smart, and stress-free. We gather trusted scholarships from around the world and present them in one place, so students can easily discover opportunities that match their academic goals, skills, and backgrounds. Whether you are a high-school student, an undergraduate, or a graduate applicant, we help you stay informed about deadlines, eligibility, and application tips. With the right guidance and resources, your dream education becomes more achievable. Unlock your future by finding the scholarship that fits you.
                </motion.div>
            </div>

            

            <button onClick={ () => navigate("/all-scholarships") }
            className='bg-[var(--color4)] text-white p-2 mx-4 rounded-xl' >
                Search Scholarships
            </button>

        </div>
    )
};

