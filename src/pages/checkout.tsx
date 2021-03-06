/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "../styles/tailwind.css";

const CheckoutForm: React.FC<{}> = ({}) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { state } = useLocation();

  useEffect(() => {
    async function FetchData() {
      const { data } = await axios.post(
        "http://127.0.0.1:5000/create-payment-intent",
        {
          items: [],
        }
      );
      console.log("check", state);
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
  const handleChange = async (event: any) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    setProcessing(true);

    if (stripe && elements) {
      console.log(elements.getElement(CardElement));
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement) || { token: "" },
          billing_details: {
            name: "Peter Cheng",
          },
        },
      });
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError("");
        setProcessing(false);
        setSucceeded(true);
      }
    }
  };

  const test = async () => {
    if (stripe) {
      const payload = await stripe.confirmCardPayment(
        "pi_1HHVP0IEWLQJp0xoR0pVmRmU_secret_CPXDIlK58cPiIxsDB1RoyJkYj",
        {
          payment_method: "pm_1HHTE2IEWLQJp0xomC8M0F7B",
        }
      );
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError("");
        setProcessing(false);
        setSucceeded(true);
      }
    }
  };

  return (
    <div className=" flex  flex-col items-center justify-center">
      <span className=" my-8 text-4xl font-bold"> Payment Page</span>
      <form
        className=" border-black border-2 border-solid my-32 py-12  rounded-md w-3/5  h-40"
        onSubmit={handleSubmit}
      >
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <div className=" flex flex-col items-center justify-center my-8 ">
          <button
            disabled={processing || disabled || succeeded}
            onClick={handleSubmit}
            id="submit"
            className=" border-black border-2 border-solid rounded-lg  w-32 h-10 bg-blue-600 text-white hover:bg-orange-400"
          >
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </button>
        </div>
      </form>
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {" "}
          Stripe dashboard.
        </a>{" "}
        Refresh the page to pay again.
      </p>{" "}
      <button onClick={test}>test</button>
    </div>
  );
};

export default CheckoutForm;
