import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
const HomeCarousel = () => {
  const banners = useSelector((state) => state.booking.banners);
  return (
    <div className="mb-10">
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        arrows={false}
      >
        {banners.map((item) => (
          <div className="h-100" key={item.maBanner}>
            <img
              className="w-full h-full object-cover object-fit "
              alt=""
              src={item.hinhAnh}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeCarousel;
