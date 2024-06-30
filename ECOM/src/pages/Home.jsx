import React from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Products from "../components/Products";
import ProductFilter from "../components/ProductFilter";

const Home = () => {
  return (
    <>
      <SearchBar />
      <div className="flex ">
        <Products />
        <ProductFilter />
      </div>
    </>
  );
};

export default Home;
