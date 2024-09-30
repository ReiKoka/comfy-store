import { ActionFunction, Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { ReduxStore } from "@/store";
import { toast } from "sonner";
import { Checkout, customFetch, formatAsDollars } from "@/utils";
import { clearCart } from "@/features/cart/cartSlice";

export function action(store: ReduxStore): ActionFunction {
  return async function ({ request }): Promise<null | Response> {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;

    if (!name || !address) {
      toast.warning("Please fill out all fields");
      return null;
    }

    const user = store.getState().userState.user;

    if (!user) {
      toast.warning("Please login to place an order");
      return redirect("/login");
    }

    const { cartItems, orderTotal, numItemsInCart } = store.getState().cartState;

    const info: Checkout = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatAsDollars(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      const result = await customFetch.post(
        "/orders",
        {
          data: info,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        },
      );
      console.log(result);
      store.dispatch(clearCart());
      toast.success("Order placed");
      return redirect("/orders");
    } catch (error) {
      toast.error("Order failed");
      return null;
    }
  };
}

function CheckoutForm() {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="mb-4 text-xl font-medium">Shipping Information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />

      <SubmitBtn text="Place Your Order" className="mt-4" />
    </Form>
  );
}

export default CheckoutForm;
