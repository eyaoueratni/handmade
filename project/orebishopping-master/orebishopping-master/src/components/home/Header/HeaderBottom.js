import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaCaretDown, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import ApiService from "../../service/ApiService";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const isAdmin = ApiService.isAdmin();
  const isAuthenticated = ApiService.isAuthenticated();
  const products = useSelector((state) => state.orebiReducer.products);

  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const categoryRef = useRef();
  const userRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setShow(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUser(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchValue}`);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      ApiService.logout();
      setTimeout(() => {
        navigate("/signin");
      }, 500);
    }
  };

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      fetchCategories();
    }
  }, [show]);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategory();
      setCategories(response.categoryList || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to fetch categories");
    }
  };

  const handleCategoryClick = (categoryId) => {
    setShow(false); // Close the dropdown after selection
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          
          {!isAdmin ? (
            <>
              {/* Shop by Category */}
              <div
                onClick={() => setShow(!show)}
                ref={categoryRef}
                className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
              >
                <HiOutlineMenuAlt4 className="w-5 h-5" />
                <p className="text-[14px] font-normal">Shop by Category</p>

                {show && (
                  <motion.ul
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
                  >
                    {error ? (
                      <li className="text-red-500 px-4 py-1">{error}</li>
                    ) : (
                      categories.map((category) => (
                        <li
                          key={category.id}
                          onClick={() => handleCategoryClick(category.id)}
                          className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                        >
                          {category.name}
                        </li>
                      ))
                    )}
                  </motion.ul>
                )}
              </div>

              {/* Search Form */}
              <form
                className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl"
                onSubmit={handleSearchSubmit}
              >
                <input
                  className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                  type="text"
                  onChange={handleSearchChange}
                  value={searchValue}
                  placeholder="Search products"
                />
                <FaSearch className="w-5 h-5" />
              </form>
            </>
          ) : null}

          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} ref={userRef} className="flex">
              <FaUser />
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >
                {!isAuthenticated ? (
                  <>
                    <Link to="/signin">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Login
                      </li>
                    </Link>
                    <Link to="/signup" onClick={() => setShowUser(false)}>
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Sign Up
                      </li>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Profile
                      </li>
                    </Link>
                    <li
                      className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </>
                )}
              </motion.ul>
            )}

            {!isAdmin && (
              <>
                <Link to="/cart">
                  <div className="relative">
                    <FaShoppingCart />
                    <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                      {products.length > 0 ? products.length : 0}
                    </span>
                  </div>
                </Link>
                <BsSuitHeartFill />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
