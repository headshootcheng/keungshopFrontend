/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "../styles/tailwind.css";
import Button from "@material-ui/core/Button";
import { useShoppingCart } from "use-shopping-cart";

const ProductBox: React.FC<{ item: any }> = ({ item }) => {
  const { addItem, removeItem, redirectToCheckout } = useShoppingCart();

  return (
    <div
      className=" border-black border-solid border-2 rounded-md w-64 flex  mx-4 my-4 py-2 flex-col items-center "
      style={{ minHeight: 200, maxHeight: 500 }}
    >
      <span className="  text-xl font-bold">{item.name}</span>
      <img src={item.image} style={{ height: 300, width: 300 }} />
      <span className=" text-2xl ">${item.price / 1000}</span>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 10 }}
        onClick={() => addItem(item)}
      >
        Add
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: 10 }}
        onClick={() => removeItem(item.sku)}
      >
        Clear
      </Button>

      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: 10 }}
        onClick={() => redirectToCheckout()}
      >
        Pay
      </Button>
      {/* <div className=" flex flex-row items-center">

      </div> */}
    </div>
  );
};

export default ProductBox;
