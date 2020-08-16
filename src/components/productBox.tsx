import React from "react";
import "../styles/tailwind.css";

const ProductBox: React.FC<{}> = ({}) => {
  return (
    <div
      className=" border-black border-solid border-2   rounded-md w-56 flex justify-center  mx-4 my-4"
      style={{ minHeight: 200 }}
    >
      <span>gundam</span>
    </div>
  );
};

export default ProductBox;
