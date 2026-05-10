import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './swiper.css';


export const SwiperDemo = () => {
    
    return (
        <div className="w-full h-64">
            <Swiper
            className='w-full h-full'
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
            >
                <SwiperSlide>
                    <img src="/demophoto-1.jpg" alt="Slide 1" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src="/demophoto-2.jpg" alt="Slide 2" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src="/demophoto-3.jpg" alt="Slide 3" />
                </SwiperSlide>

            </Swiper>
        </div>
    );
}



