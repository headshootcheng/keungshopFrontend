import React, { useEffect, useState } from "react";
import "../styles/tailwind.css";
import axios from "axios";
import Topbar from "../components/topbar";
import SideMenu from "../components/sidemenu";
import { useLocation } from "react-router-dom";
import Index from "./index";
import ProductList from "./productlists";
import { loadStripe } from "@stripe/stripe-js";
import { CartProvider } from "use-shopping-cart";
const stripePromise = loadStripe(process.env.REACT_APP_STIPE_KEY || "");

const Dashboard = () => {
  const [isMenuOpen, setMenuOStatus] = useState<boolean>(false);
  const { search } = useLocation();
  const qs = require("query-string");
  const { tid } = qs.parse(search);

  const onPressMenu = () => {
    setMenuOStatus(!isMenuOpen);
  };
  // if (tid) {
  //   console.log(tid);
  // }

  const onCloseMenu = () => {
    setMenuOStatus(false);
  };

  return (
    <CartProvider
      stripe={stripePromise}
      successUrl="http://www.stripe.com"
      cancelUrl="https://www.google.com"
      currency="hkd"
      allowedCountries={["HK"]}
      billingAddressCollection={true}
      mode="client-only"
    >
      <div className="flex flex-col h-screen">
        <Topbar username="test" onPressMenu={onPressMenu} />
        <div className=" flex-1 flex flex-row h-64">
          <SideMenu isMenuOpen={isMenuOpen} onCloseMenu={onCloseMenu} />
          {tid ? <ProductList tid={tid} /> : <Index />}
        </div>
      </div>
    </CartProvider>
  );
};

export default Dashboard;
