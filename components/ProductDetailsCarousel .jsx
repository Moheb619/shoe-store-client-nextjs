import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { API_URL } from "./../utils/urls";
import Image from "next/image";
const ProductDetailsCarousel = ({ images, name }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel infiniteLoop={true} showIndicators={false} showStatus={false} thumbWidth={60} className="productCarousel">
        {images?.map((i, index) => (
          <img key={index} src={`${API_URL}${i}`} alt={name} />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
