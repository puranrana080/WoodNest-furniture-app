import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import slide1 from "../assets/slider/slide1.webp";
import slide2 from "../assets/slider/slide2.webp";
import slide3 from "../assets/slider/slide3.webp";
import slide4 from "../assets/slider/slide4.webp";

const Carousel = () => {
  return (
    <div className="hidden sm:block w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        // pagination={{ clickable: true }}
        navigation
        loop
        // className="h-130"
      >
        {[slide1, slide2, slide3, slide4].map((img, index) => (
          <SwiperSlide key={index}>
             {/* <div className="w-full aspect-[16/6] lg:aspect-[16/5] xl:aspect-[16/4]"> */}
            <img
              src={img}
              alt="banner"
              className="w-full  object-contain"
            />
            {/* </div> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
