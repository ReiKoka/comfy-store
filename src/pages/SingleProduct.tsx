import { useState } from "react";
import { Link, LoaderFunction, useLoaderData } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem, customFetch, formatAsDollars, type SingleProductResponse } from "@/utils";
import { SelectProductAmount, SelectProductColor } from "@/components";
import { Mode } from "@/components/SelectProductAmount";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks";
import { addItem } from "@/features/cart/cartSlice";

const url = "/products/";

export const loader: LoaderFunction = async ({ params }): Promise<SingleProductResponse> => {
  const response = await customFetch<SingleProductResponse>(`${url}${params.id}`);
  return { ...response.data };
};

function SingleProduct() {
  const { data: product } = useLoaderData() as SingleProductResponse;
  const { image, title, price, description, colors, company } = product.attributes;
  const dollarsAmount = formatAsDollars(price);

  const [productColor, setProductColor] = useState<string>(colors[0]);
  const [amount, setAmount] = useState(1);

  const dispatch = useAppDispatch();

  const cartProduct: CartItem = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    amount,
    productColor,
    company,
  };

  function addToCart() {
    dispatch(addItem(cartProduct));
  }

  return (
    <section>
      <div className="flex h-6 items-center gap-x-2">
        <Button asChild variant="link" size="sm">
          <Link to="/">Home</Link>
        </Button>
        <Separator orientation="vertical" />
        <Button asChild variant="link" size="sm">
          <Link to="/products">Products</Link>
        </Button>
      </div>

      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img src={image} alt={title} className="h-96 w-96 rounded-lg object-cover lg:w-full" />
        <div>
          <h1 className="text-3xl font-bold capitalize">{title}</h1>
          <h4 className="mt-2 text-xl">{company}</h4>
          <p className="text-md mt-3 inline-block rounded-md bg-muted p-2">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>

          <SelectProductColor
            colors={colors}
            productColor={productColor}
            setProductColor={setProductColor}
          />
          <SelectProductAmount mode={Mode.SingleProduct} amount={amount} setAmount={setAmount} />

          <Button size="lg" className="mt-10" onClick={addToCart}>
            Add to bag
          </Button>
        </div>
      </div>
    </section>
  );
}
export default SingleProduct;
