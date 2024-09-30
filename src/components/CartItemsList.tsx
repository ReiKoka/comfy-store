import { useAppSelector } from "@/hooks";
import { Card } from "./ui/card";
import { FirstColumn, SecondColumn, ThirdColumn, FourthColumn } from "./CartItemColumns";

function CartItemsList() {
  const cartItems = useAppSelector((state) => state.cartState.cartItems);
  console.log(cartItems);
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { cartID, title, price, image, amount, company, productColor } = cartItem;
        return (
          <Card key={cartID} className="mb-8 flex flex-col flex-wrap gap-y-4 p-6 sm:flex-row">
            <FirstColumn image={image} title={title} />
            <SecondColumn title={title} company={company} productColor={productColor} />
            <ThirdColumn amount={amount} cartID={cartID} />
            <FourthColumn price={price} />
          </Card>
        );
      })}
    </div>
  );
}

export default CartItemsList;
