// src/components/Hero.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/Hero.css";

import heroImg1 from "../assets/images/image13.jpg";
import heroImg2 from "../assets/images/image1.png";
import heroImg3 from "../assets/images/image6.png";
import heroImg4 from "../assets/images/image14.jpg";
import heroImg5 from "../assets/images/image15.jpg";
import heroImg6 from "../assets/images/image20.jpg";
import heroImg7 from "../assets/images/image21.jpg";
import heroImg8 from "../assets/images/image22.jpg";
import heroImg9 from "../assets/images/image23.jpg";
import heroImg10 from "../assets/images/image24.jpg";
import heroImg11 from "../assets/images/image25.jpg";
import heroImg12 from "../assets/images/image26.jpg";
import heroImg13 from "../assets/images/image27.jpg";

const Hero = () => {
    return (
        <div className="hero-container">
            <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                keyboard={{ enabled: true, onlyInViewport: true }}
                className="hero-swiper"
            >

                {[heroImg1, heroImg2, heroImg3, heroImg4, heroImg5, heroImg6, heroImg7, heroImg8, heroImg9, heroImg10, heroImg11, heroImg12, heroImg13].map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt={`Hero ${index + 1}`} className="hero-image" />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="hero-text">
                <h1>Welcome to GIMS CMI</h1>
                <p>1st Public Hospital Based Medical Incubation Centre in Uttar Pradesh</p>
            </div>
        </div>
    );
};

export default Hero;
