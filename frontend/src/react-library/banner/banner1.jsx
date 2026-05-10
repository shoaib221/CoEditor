import React from 'react';


export const Banner1 = () => {

    return (
        <div className='grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] gap-4 px-4' >
            <div className='h-[15rem] bg-cover bg-bottom rounded-xl' style={{ backgroundImage: "url('/banner.jpg')" }} ></div>
            <div className='flex flex-col justify-end'>
                <div className="relative overflow-hidden">

                    <motion.div
                        className="text-3xl font-bold"
                        initial={{ x: 500 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        Grab Your <span style={{ color: 'red' }}>Opportunities</span>
                    </motion.div>
                </div>

                <div className="relative overflow-hidden py-2">

                    <motion.div
                        className="text-justify italic"
                        initial={{ y: -500 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        Your gateway to endless career opportunities! Discover jobs, connect with employers, and take the next step toward your future. Start exploring and find your perfect match today!
                    </motion.div>
                </div>


                <div className="relative overflow-hidden">

                    <motion.button
                        className='cen-ver max-w-[10rem] p-2 bg-red-600 text-center font-bold text-white rounded-xl' onClick={() => navigate("/add-job")}
                        initial={{ x: -500 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        Add a job
                    </motion.button>
                </div>

            </div>
        </div>
    );
};



import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useNavigate } from 'react-router-dom';

const slides = [
    {
        image: "/america.webp",
        title: "Study in America",
    },
    {
        image: "/asia.jpg",
        title: "Study in Asia",
    },
    {
        image: "/europe.jpg",
        title: "Study in Europe",
    },
    {
        image: "/australia.webp",
        title: "Study in Australia",
    },
    {
        image: "/africa.jpg",
        title: "Study in Africa",
    },
];

export function Banner12() {
    const navigate = useNavigate();
    return (
        /* Outer lock */
        <div className="relative w-full max-w-full min-w-0  px-2 rounded-xl">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                loop
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="w-full max-w-full min-w-0  h-[260px]  lg:h-[400px] rounded-xl"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="w-full min-w-0 ">
                        <div
                            className="relative w-full h-full bg-cover bg-center  rounded-xl"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />

                            {/* Title */}
                            <div className="relative z-10 flex h-full items-start p-4 sm:p-6 md:p-10">
                                <div className="text-lg sm:text-2xl md:text-4xl font-bold text-white tracking-wide">
                                    {slide.title}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <br/>

            <div className='text-2xl font-bold' > Grab Your<span className='text-[var(--color4)]' > Dream</span>  Scholarships</div>

            <br/>

            <div className='italic' >
                Finding the right scholarship can be life-changing, but searching for it shouldn’t feel overwhelming. Our platform is designed to make scholarship hunting simple, smart, and stress-free. We gather trusted scholarships from around the world and present them in one place, so students can easily discover opportunities that match their academic goals, skills, and backgrounds. Whether you are a high-school student, an undergraduate, or a graduate applicant, we help you stay informed about deadlines, eligibility, and application tips. With the right guidance and resources, your dream education becomes more achievable. Unlock your future by finding the scholarship that fits you.
                

            </div>
            <br/>

            <button className='hover:opacity-80 p-2 bg-(--color4) text-center font-bold text-(--color1) rounded-xl' onClick={() => navigate("/all-scholarships")} >
                Search Scholarships
            </button>


        </div>
    );
}

