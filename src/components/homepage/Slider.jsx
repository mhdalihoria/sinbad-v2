import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRouter } from "next/router";

const sliderContent = [
  {
    slider_image: "http://placehold.jp/200x100.png",
    slider_link: "http://placehold.jp/200x100.png",
  },
  {
    slider_image: "http://placehold.jp/200x100.png",
    slider_link: "http://placehold.jp/200x100.png",
  },
];

const Slider = () => {
  const router = useRouter();

  const handleRedirects = (link) => {
    router.push(link);
  };

  return (
    <Swiper
      //   spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay={true}
    >
      {sliderContent.map((item, index) => (
        <SwiperSlide
          onClick={() => handleRedirects(item.slider_link)}
          key={index}
        >
          <div style={{ height: "300px", width: "100%", position: "relative" }}>
            <Image
              src={item.slider_image}
              alt="slider"
              // width={400}
              // height={100}
              layout="fill"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
