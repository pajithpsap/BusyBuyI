import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import { AuthContext } from "../context/AuthContext";

const Products = () => {
  const { products, setProducts, setAllProducts } = useContext(AuthContext);
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />; // Show loading component while fetching data
  }

  return (
    <div className="w-[70%] mt-10 ml-10">
      <ul className="flex flex-wrap gap-10">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default Products;
