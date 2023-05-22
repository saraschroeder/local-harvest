import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PAYMENT_INTENT } from "../utils/mutations";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCreditCard } from "react-icons/fa";
import CurrencyInput from "react-currency-input-field";

const Donation: React.FC = () => {
  const [amount, setAmount] = useState<string>(""); // Provide initial value as an empty string
  const [paymentIntent, setPaymentIntent] = useState<any>(null); // Adjust the type of paymentIntent as necessary
  const stripe = useStripe();
  const elements = useElements();

  const [createPaymentIntent, { error }] = useMutation(CREATE_PAYMENT_INTENT);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const parsedAmount = Number(amount.replace(/[^0-9.-]+/g, ""));
        if (parsedAmount < 1) {
          // Handle invalid amount (less than 1)
          return;
        }
  
        const { data } = await createPaymentIntent({
          variables: { amount: parsedAmount },
        });
        setPaymentIntent(data.createPaymentIntent);
      } catch (e) {
        console.error("Error creating payment intent:", e);
      }
    };
  
    fetchPaymentIntent();
  }, [amount, createPaymentIntent]);

  const handleDonate = async () => {
    if (paymentIntent && stripe && elements) {
      const { client_secret } = paymentIntent;

      const cardElement = elements.getElement(CardElement);
      const card = cardElement ? { card: cardElement } : "";

      const { error } = await stripe.confirmCardPayment(client_secret, {
        payment_method: card,
      });

      if (error) {
        console.error("Payment failed:", error);
      } else {
        console.log("Payment succeeded!");
        // Handle successful payment
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Make a Donation</h1>
      <div className="donation-form">
        <label>Amount (in USD)</label>
        <CurrencyInput
          id="donation-amount"
          name="donation-amount"
          placeholder="Please enter a number"
          value={amount}
          decimalsLimit={2}
          onValueChange={(value) => setAmount(value || "")} // Provide an empty string if value is undefined
        />
        <div className="card-element-container">
          <CardElement />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleDonate}>
          Donate <FaCreditCard />
        </button>
      </div>
    </div>
  );
};

const WrappedDonation: React.FC = () => {
  const stripePromise = loadStripe(
    "sk_test_51N9BOWDpKmnLMg2OJUManAkWYJVsMJ8GPXH6NC6Iv3gGDoX49EnHLnTNy9pIyPNAQAHYROjB6OunybqaE5uVDNKO0019EaAf3A"
  );

  return (
    <Elements stripe={stripePromise}>
      <Donation />
    </Elements>
  );
};

export default WrappedDonation;
