import React, { useEffect, useState } from "react";
import "../styles/tailwind.css";
import ProductBox from "../components/productBox";
import sampleData from "../data/sampleData";

const ProductList: React.FC<{ tid: number }> = ({ tid }) => {
  //console.log(sampleData);
  return (
    <div className="flex-1 flex pt-8 px-6 flex-wrap flex-row  overflow-scroll">
      {sampleData.map((item: any, index: number) => {
        return <ProductBox item={item} />;
      })}
    </div>
  );
};

export default ProductList;
