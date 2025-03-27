import React from "react";
import { Link } from "react-router-dom";

const ProductTypeList = ({}) => {
  const products = [
    { id: 1, name: "Bed" },
    { id: 2, name: "couch" },
    { id: 3, name: "table" },
    { id: 4, name: "chair" },
  ];
  return (
    <div className={`px-14`}>
      <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <li key={product.id} className="overflow-hidden">
             <Link to={`/product-types/${product.id}`}> 
            <p>{product.name}</p>
             </Link> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductTypeList;
