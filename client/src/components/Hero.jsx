// src/components/Hero.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "../styles/Hero.css";

// Import all your hero images
import heroImg1 from "../assets/images/image2.png";
import heroImg2 from "../assets/images/image1.png";
import heroImg3 from "../assets/images/image6.png";

const Hero = () => {
    return (
        <div className="hero-container">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="hero-swiper"
            >
                <SwiperSlide>
                    <img src={heroImg1} alt="Hero 1" className="hero-image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={heroImg2} alt="Hero 2" className="hero-image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={heroImg3} alt="Hero 3" className="hero-image" />
                </SwiperSlide>
            </Swiper>

            <div className="hero-text">
                <h1>Welcome to GIMS CMI</h1>
                <p>1st Public Hospital Based Medical Incubation Centre in Uttar Pradesh</p>
            </div>
        </div>
    );
};

export default Hero;
