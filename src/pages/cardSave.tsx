import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardSaveForm from "./saveCardForm";

const stripePromise = loadStripe(process.env.REACT_APP_STIPE_KEY || "");

const CardSave = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardSaveForm />
    </Elements>
  );
};

export default CardSave;
