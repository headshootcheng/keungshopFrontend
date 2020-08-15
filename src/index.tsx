import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import { loadStripe } from "@stripe/stripe-js";
import { CartProvider } from "use-shopping-cart";
const stripePromise = loadStripe(process.env.REACT_APP_STIPE_KEY || "");

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <CartProvider
          stripe={stripePromise}
          successUrl="stripe.com"
          cancelUrl="google.com"
          currency="hkd"
          allowedCountries={["HK"]}
          billingAddressCollection={true}
          mode="client-only"
        >
          <Route path="/dashboard" component={Dashboard} />
        </CartProvider>
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
