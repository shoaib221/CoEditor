
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import './aos.css'


export const Aos = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Animation duration in ms
    }, []);

    return (
        <div>
            

            <div data-aos="fade-right" data-aos-duration="1000">
                <h2>Fade Right Animation</h2>
            </div>

            <div data-aos="zoom-in" data-aos-delay="300">
                <p>This will zoom in with a delay.</p>
            </div>
        </div>


    );
}