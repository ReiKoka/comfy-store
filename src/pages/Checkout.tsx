import { CartTotals, CheckoutForm, SectionTitle } from "@/components";
import { useAppSelector } from "@/hooks";
import { ReduxStore } from "@/store";
import { LoaderFunction, redirect } from "react-router-dom";

export function loader(store: ReduxStore): LoaderFunction {
  return async function (): Promise<Response | null> {
    const user = store.getState().userState.user;

    if (!user) {
      return redirect("/login");
    }

    return null;
  };
}

function Checkout() {
  const cartTotal = useAppSelector((state) => state.cartState.cartTotal);

  if (!cartTotal) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid items-start gap-8 md:grid-cols-2">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
}
export default Checkout;
