import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    } else {
      setPrevLocation("Home");
    }
  }, [location]);

  return (
    <div className="max-w-container mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
      <Breadcrumbs title="About" prevLocation={prevLocation} />
      <div className="pb-10 text-center">
        <h3 className="max-w-[600px] text-lg text-lightText mb-2">
          At{" "}
          <span className="text-primeColor font-semibold text-4xl block">
            Handmade SHOP
          </span>
          <span className="text-xl block mt-2">
            we celebrate the art of craftsmanship. Each of our products is
            carefully crafted with passion, skill, and a personal touch,
            ensuring that every item is unique. We believe in quality,
            sustainability, and the beauty of handmade creations. Discover the
            charm and individuality of our pieces, made with love and
            dedication.
          </span>
        </h3>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
