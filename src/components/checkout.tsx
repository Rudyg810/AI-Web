import config from "@/lib/config";
import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }) {
    let stripePromise = null;

    const getStripe = () => {
        if (!stripePromise) {
            stripePromise = loadStripe(config.StripePublishableKey);
        }
        return stripePromise;
    }

    try {
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            mode: "payment",
            lineItems,
            successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: window.location.origin
        });

        if (error) {
            console.error("Error redirecting to checkout:", error);
            // Handle error (e.g., display error message to user)
        }
    } catch (error) {
        console.error("Error loading Stripe:", error);
        // Handle error (e.g., display error message to user)
    }
}
