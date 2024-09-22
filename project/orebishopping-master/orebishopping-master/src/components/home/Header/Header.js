import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Flex from "../../designLayouts/Flex";
import ApiService from "../../service/ApiService";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const location = useLocation();
  
  const navigate = useNavigate();

  const isArtisan = ApiService.isArtisan();
  const isAdmin = ApiService.isAdmin();
  const isAuthenticated = ApiService.isAuthenticated();
  
  useEffect(() => {
    const ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
    return () => window.removeEventListener("resize", ResponsiveMenu);
  }, []);

  const renderMenuItems = () => {
    if (isAdmin) {
      return (
        <motion.ul
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center w-auto z-50 p-0 gap-2"
        >
          <div
            className="flex font-normal  w-48 h-10 justify-center items-center text-base text-[#767676]  decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0 whitespace-nowrap"
            to="/admin"
          >
            <li>Dashboard Admin</li>
          </div>
          <NavLink
            className="flex font-normal hover:font-bold w-48 h-10 justify-center items-center text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0 whitespace-nowrap"
            to="/admin/category"
          >
            <li>Manage Categories</li>
          </NavLink>
          <NavLink
            className="flex font-normal hover:font-bold w-48 h-10 justify-center items-center text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0 whitespace-nowrap"
            to="/admin/manageUser"
          >
            <li>Manage Artisans/Clients</li>
          </NavLink>
          <NavLink
            className="flex font-normal hover:font-bold w-48 h-10 justify-center items-center text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0 whitespace-nowrap"
            to="/statistics"
          >
            <li>Statistics</li>
          </NavLink>
          <NavLink
            className="flex font-normal hover:font-bold w-48 h-10 justify-center items-center text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0 whitespace-nowrap"
            to="/admin/orders"
          >
            <li>Manage Orders</li>
          </NavLink>
        </motion.ul>
      );
    } else if (isArtisan) {
      return (
        <motion.ul
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center w-auto z-50 p-0 gap-2"
        >
          <NavLink
            className="flex font-normal hover:font-bold w-48 h-10 justify-center items-center text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0 whitespace-nowrap"
            to="/artisan"
          >
            <li>Dashboard Artisan</li>
          </NavLink>
          <NavLink
            className="flex font-normal hover:font-bold w-48 h-10 justify-center items-center text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0 whitespace-nowrap"
            to="/artisan/product"
          >
            <li>Manage Products</li>
          </NavLink>
        </motion.ul>
      );
    } else {
      return (
        <motion.ul
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center w-auto z-50 p-0 gap-2"
        >
          <NavLink
            className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
            to="/"
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
            to="/shop"
          >
            <li>Shop</li>
          </NavLink>
          {isAuthenticated && (
            <NavLink
              className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
              to="/about"
            >
              <li>About</li>
            </NavLink>
          )}
          <NavLink
            className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
            to="/cart"
          >
            <li>Cart</li>
          </NavLink>
        </motion.ul>
      );
    }
  };

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <div className="navbar-brand">
              <NavLink to="/" className="site-name">Handmade SHOP</NavLink>
            </div>
          </Link>
          <div>
            {showMenu && renderMenuItems()}
          </div>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
