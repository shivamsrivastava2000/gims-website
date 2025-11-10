import '../styles/Gallery.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { loadGalleryImages } from '../utils/loadGallery';
const images = loadGalleryImages();

const Gallery = () => {
    return (
        <section className="gallery-section">
            <h2 className="gallery-heading">Our Facilities & Events</h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
            >
                {images.map((img, i) => (
                    <SwiperSlide key={i}>
                        <img src={img} alt={`Slide ${i + 1}`} className="gallery-slide" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Gallery;
