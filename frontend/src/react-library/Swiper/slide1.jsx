import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

import './slide1-style.css'
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../auth/context";
import { useNavigate } from "react-router-dom";
import "swiper/css/free-mode";
import { Loading } from "../miscel/Loading";

export function InfiniteSlider() {
    const { axiosInstance } = useAuthContext();
    const [scholarships, setScholarships] = useState(null);
    const navigate = useNavigate();
    const swiperRef = useRef(null);

    useEffect(() => {
        if(!scholarships) return;

        if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.update();
            console.log("updated")
        }
    }, [scholarships]);

    async function FetchScholarships() {
        try {
            let response = await axiosInstance.get("/scholarship/all?sortBy=tuitionFees&sortOrder=asc&count=6")
            setScholarships(response.data.scholarships)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {


        FetchScholarships();

    }, []);

    if(!scholarships) return <Loading/>

    return (
        <div className="w-full p-4 h-60">
            <Swiper
                ref={swiperRef}
                className="h-full"
                modules={[Autoplay, FreeMode]}
                freeMode={true}
                loop={true}
                speed={3000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                slidesPerView="auto"
                spaceBetween={20}
                allowTouchMove={false}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    480: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {scholarships && scholarships.map((elem) => (
                    <SwiperSlide key={elem._id} className="h-full" >
                        <div
                            onClick={() =>
                                navigate(`/scholarship-detail/${elem._id}`)
                            }
                            className="flex flex-col-reverse rounded-lg"
                            style={{
                                backgroundImage: `url(${elem.image})`, backgroundSize: "cover", height: "100%",
                                backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: 'var(--color1)'
                            }}
                        >

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg" />
                            <div className="text-white text-lg z-20 items-center text-center" > {elem.scholarshipName} </div> 
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
