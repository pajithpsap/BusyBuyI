import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function CheckboxComponent({ name }) {
  const { products, setProducts, allProducts, setAllProducts } =
    useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    const value = event.target.checked;
    setIsChecked(value);
    if (value) {
      const filteredProducts = allProducts.filter(
        (product) => product.category === name.toLowerCase()
      );
       console.log("true ");
      setProducts(filteredProducts);
    } else {
      console.log("false ");
      setProducts(allProducts);
    }
  };

  return (
    <div className="flex items-center p-4">
      {/* Step 3: Add the checkbox with onChange event */}
      <input
        checked={isChecked}
        id="checked-checkbox"
        type="checkbox"
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={handleCheckboxChange}
      />
      {/* Label for the checkbox */}
      <label
        htmlFor="checked-checkbox"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {name}
      </label>
    </div>
  );
}

export default CheckboxComponent;
