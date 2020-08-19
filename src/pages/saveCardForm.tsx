/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

import "../styles/tailwind.css";

const CardSaveForm: React.FC<{}> = ({}) => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function FetchData() {
      const { data } = await axios.post(
        "http://127.0.0.1:5000/create-setup-intent",
        {}
      );
      console.log(data);
      setClientSecret(data.clientSecret);
    }
    FetchData();
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "blue",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
        iconStyle: "solid",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
        iconStyle: "solid",
      },
    },
  };
  //   const handleChange = async (event: any) => {
  //     // Listen for changes in the CardElement
  //     // and display any errors as the customer types their card details
  //     setDisabled(event.empty);
  //     setError(event.error ? event.error.message : "");
  //   };

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    console.log(elements.getElement(CardElement));

    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) || { token: "" },
        billing_details: {
          name: "Jenny Rosen",
          email: "bb@gmail.com",
        },
      },
    });

    if (result.error) {
      setError(false);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className=" flex  flex-col items-center justify-center">
      <span className=" my-8 text-4xl font-bold">Save Page</span>
      <form
        className=" border-black border-2 border-solid my-32 py-12  rounded-md w-3/5  h-40"
        onSubmit={handleSubmit}
      >
        <CardElement
          id="card-element"
          options={cardStyle}
          //onChange={handleChange}
        />
        <div className=" flex flex-col items-center justify-center my-8 ">
          <button
            disabled={!stripe}
            onClick={handleSubmit}
            id="submit"
            className=" border-black border-2 border-solid rounded-lg  w-32 h-10 bg-blue-600 text-white hover:bg-orange-400"
          >
            Save Card
          </button>
        </div>
      </form>
      {error ? <div>Save card Failed</div> : null}
      {success ? <div>Save card success</div> : null}
    </div>
  );
};

export default CardSaveForm;
