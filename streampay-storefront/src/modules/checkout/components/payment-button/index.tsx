import { useCheckout } from "@lib/context/checkout-context";
import { PaymentSession } from "@medusajs/medusa";
import Button from "@modules/common/components/button";
import Spinner from "@modules/common/icons/spinner";
import { OnApproveActions, OnApproveData } from "@paypal/paypal-js";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useStreamPay } from "@streampay/react-streampay-js";
import { useCart } from "medusa-react";
import React, { useEffect, useState } from "react";

type PaymentButtonProps = {
  paymentSession?: PaymentSession | null;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({ paymentSession }) => {
  const [notReady, setNotReady] = useState(true);
  const { cart } = useCart();

  useEffect(() => {
    setNotReady(true);

    if (!cart) {
      return;
    }

    if (!cart.shipping_address) {
      return;
    }

    if (!cart.billing_address) {
      return;
    }

    if (!cart.email) {
      return;
    }

    if (cart.shipping_methods.length < 1) {
      return;
    }

    setNotReady(false);
  }, [cart]);

  switch (paymentSession?.provider_id) {
    case "stripe":
      return (
        <StripePaymentButton session={paymentSession} notReady={notReady} />
      );
    case "manual":
      return <ManualTestPaymentButton notReady={notReady} />;
    case "streampay":
      return (
        <StreamPayPaymentButton notReady={notReady} session={paymentSession} />
      );
    case "paypal":
      return (
        <PayPalPaymentButton notReady={notReady} session={paymentSession} />
      );
    default:
      return <Button disabled>Select a payment method</Button>;
  }
};

const StripePaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession;
  notReady: boolean;
}) => {
  // ... Rest of the StripePaymentButton component remains the same.
};

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

const PayPalPaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession;
  notReady: boolean;
}) => {
  // ... Rest of the PayPalPaymentButton component remains the same.
};

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  // ... Rest of the ManualTestPaymentButton component remains the same.
};

export default PaymentButton;
