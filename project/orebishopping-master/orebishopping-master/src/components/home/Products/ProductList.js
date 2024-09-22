import React, { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineLabelImportant } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/orebiSlice"; // Assuming Redux is used for cart management
import Image from "../../designLayouts/Image";
import { useCart } from "../context/CartContext";
import Badge from "./Badge";

const ProductList = ({ products = [] }) => {
  const { cart = [], dispatch: cartDispatch } = useCart(); // Use custom cart context with defaults
  const reduxDispatch = useDispatch(); // Redux dispatch
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();

  const handleWishList = (product) => {
    toast.success("Product added to Wish List");
    setWishList((prevList) => [...prevList, product]); // Add to wishlist
  };

  const handleProductDetails = (product) => {
    const rootId = String(product.name).toLowerCase().split(" ").join("");
    navigate(`/product/${rootId}`, {
      state: { item: product },
    });
  };

  const addProductToCart = (product) => {
    reduxDispatch(addToCart({ ...product, quantity: 1 })); // Redux action
    cartDispatch({ type: "ADD_ITEM", payload: product }); // Custom cart context action
  };

  const incrementItem = (product) => {
    cartDispatch({ type: "INCREMENT_ITEM", payload: product });
  };

  const decrementItem = (product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      cartDispatch({ type: "DECREMENT_ITEM", payload: product });
    } else {
      cartDispatch({ type: "REMOVE_ITEM", payload: product });
    }
  };

  return (
    
  <div className="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.length > 0 ? (
        products.map((product, index) => {
          const cartItem = cart.find((item) => item.id === product.id);
          return (
            <div className="product-item" key={index}>
              <div className="w-full relative group">
                <div className="max-w-80 max-h-80 relative overflow-y-hidden">
                  <div onClick={() => handleProductDetails(product)}>
                    {/* Use the imageUrl attribute from the product object */}
                    <Image className="w-1/2 h-1/2" imgSrc={product.image} />

                  </div>
                  <div className="absolute top-6 left-8">
                    {product.badge && <Badge text="New" />}
                  </div>
                  <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
                    <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
                      <li
                        className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
                        onClick={() => handleWishList(product)}
                      >
                        Add to Wish List
                        <span>
                          <BsSuitHeartFill />
                        </span>
                      </li>
                      <li
                        className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
                        onClick={() => addProductToCart(product)}
                      >
                        Add to Cart
                        <span>
                          <FaShoppingCart />
                        </span>
                      </li>
                      <li
                        className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
                        onClick={() => handleProductDetails(product)}
                      >
                        View Details
                        <span className="text-lg">
                          <MdOutlineLabelImportant />
                        </span>
                      </li>
                      <li
                        className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
                      >
                        Compare
                        <span>
                          <GiReturnArrow />
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
                  <div className="flex items-center justify-between font-titleFont">
                    <h2 className="text-lg text-primeColor font-bold">
                      {product.name}
                    </h2>
                    <p className="text-[#767676] text-[14px]">
                      DT{product.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#767676] text-[14px]">
                      {product.color}
                    </p>
                  </div>
                </div>
                {cartItem ? (
                  <div className="quantity-controls">
                    <button onClick={() => decrementItem(product)}> - </button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={() => incrementItem(product)}> + </button>
                  </div>
                ) : (
                  <button onClick={() => addProductToCart(product)}>
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductList;


