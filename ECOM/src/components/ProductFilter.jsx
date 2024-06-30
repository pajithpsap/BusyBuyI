import React, { useContext, useEffect, useState } from "react";
import CheckboxComponent from "./CheckBox";
import { AuthContext } from "../context/AuthContext";

const ProductFilter = () => {
  const { products, setProducts, allProducts, setAllProducts } = useContext(AuthContext);
  const [sliderValue, setSliderValue] = useState(2000);


  useEffect(() => {
    // Set allProducts when products change
    if (products && products.length == 0) {
      setProducts(allProducts);
    }
  }, [products]);

  const handleSliderChange = (event) => {
    const value =  parseInt(event.target.value, 10);
    setSliderValue(value);
    filterProducts(value);
  };

  const filterProducts = (maxPrice) => {
    if (maxPrice === 0) {
      setProducts(allProducts); // If slider value is 0, show all products
    } else {
      const filteredProducts = allProducts.filter(product => product.price <= maxPrice);
      console.log(allProducts);
      setProducts(filteredProducts);
    }
  };

  return (
    <div className="fixed bg-blue-100 rounded-md right-[50px] border-2 border-gray-200 w-[20%] h-[400px] flex flex-col justify-around items-center">
      <div className="w-[80%] flex flex-col justify-center">
        <div className="p-4">Price : Rs {sliderValue}</div>
        <input
          type="range"
          min={0}
          max="2000"
          value={sliderValue}
          className="range range-info"
          onChange={handleSliderChange}
        />
      </div>

      <div className="w-[80%]">
        <p>Categories</p>
        <CheckboxComponent name={"Men's Clothing"} />
        <CheckboxComponent name={"Women's Clothing"} />
        <CheckboxComponent name={"Jewelery"} />
        <CheckboxComponent name={"Electronics"} />
      </div>
    </div>
  );
};

export default ProductFilter;
