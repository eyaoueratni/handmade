import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo
} from "../../assets/images";
import Image from "../designLayouts/Image";

const CustomSlide = ({ Subtext, imgSrc, text, buttonLink, buttonText }) => (
  <div
    style={{
      position: "relative",
      backgroundColor: "#F5F5F3", // Gray background color
      display: "flex",
      justifyContent: "space-between", // Align text and image to the edges
      alignItems: "center", // Center vertically
      padding: "20px", // Add padding for better spacing
    }}
  >
    <div
      style={{
        maxWidth: "450px", // Adjust the maxWidth as needed
        marginRight: "20px", // Add margin between text/button and image
      }}
    >
      <h1
        style={{
          marginBottom: "10px",
          fontSize: "1.8rem", // Smaller font size for the main text
          color: "#000", // Black color
          fontWeight: "700",
        }}
      >
        {text}
      </h1>
      <p
        style={{
          marginBottom: "20px",
          fontSize: "1rem", // Smaller font size for the subtext
          color: "#666", // Gray color
        }}
      >
        {Subtext}
      </p>

      <Link to={buttonLink}>
        <button className="bg-primeColor text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-black duration-300 font-bold">
          {buttonText}
        </button>
      </Link>
    </div>
    <div style={{ flexShrink: 0 }}>
      <Image imgSrc={imgSrc} />
    </div>
  </div>
);

const Banner = () => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px", // Position dots at the bottom
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <ul style={{ margin: "0px", display: "flex", listStyleType: "none", padding: "0" }}> 
          {dots} 
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRadius: "50%",
                border: "3px solid #262626",
                textAlign: "center",
                lineHeight: "30px",
                cursor: "pointer",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRadius: "50%",
                border: "3px solid white",
                textAlign: "center",
                lineHeight: "30px",
                cursor: "pointer",
              }
        }
      >
        {i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <ul style={{ margin: "0px", display: "flex", listStyleType: "none", padding: "0" }}> 
                {dots} 
              </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRadius: "50%",
                      border: "3px solid #262626",
                      textAlign: "center",
                      lineHeight: "25px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRadius: "50%",
                      border: "3px solid white",
                      textAlign: "center",
                      lineHeight: "25px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              {i + 1}
            </div>
          ),
        },
      },
    ],
  };

  const slides = [
    {
      imgSrc: bannerImgOne,
      text: "Enhance Your Shopping Experiences",
      Subtext: "Explore our premium printers and consumables for exceptional results",
      buttonLink: "/offer",
      buttonText: "Shop Now",
    },
    {
      imgSrc: bannerImgTwo,
      text: "Quality Printing Solutions",
      Subtext: "Discover our wide range of printers and consumables designed for professional printing needs.",
      buttonLink: "/shop",
      buttonText: "About Us",
    },
    {
      imgSrc: bannerImgOne,
      text: "Efficiency Redefined",
      Subtext: "Maximize productivity with our advanced printers and high-quality consumables.",
      buttonLink: "/contact",
      buttonText: "Contact Us",
    },

    // Add more slides as needed
  ];

  return (
    <div className="w-full bg-white">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
