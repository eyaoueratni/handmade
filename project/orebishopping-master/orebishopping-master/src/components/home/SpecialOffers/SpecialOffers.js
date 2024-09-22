import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService"; // Ensure this is the correct path to your ApiService
import Heading from "../Products/Heading";
import Product from "../Products/Product";

const SpecialOffers = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ApiService.getAllProductsByCategoryId(category);
        setProducts(response.productList || []); // Assuming response.productList contains the products
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unable to fetch products");
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-3 gap-10">
          {products.map((product) => (
            <Product
              key={product._id}
              _id={product._id}
              img={product.image}
              productName={product.productName}
              price={product.price}
              color={product.color}
              badge={true}
              des={product.des}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialOffers;
