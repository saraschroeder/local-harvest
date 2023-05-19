import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PAYMENT_INTENT } from "../utils/mutations";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../assets/css/donation.css";
import { FaCreditCard } from "react-icons/fa";

const Donation: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const [createPaymentIntent, { error }] = useMutation(CREATE_PAYMENT_INTENT);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const { data } = await createPaymentIntent({
          variables: { amount },
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
      const card = cardElement ? { card: cardElement } : '';
  
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
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="form-control"
          required
        />
        <div className="card-element-container">
          <CardElement />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleDonate}>
          Donate <FaCreditCard />
        </button>
        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
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
