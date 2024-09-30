import { formatAsDollars } from "@/utils";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/hooks";
import { editItem, removeItem } from "@/features/cart/cartSlice";
import SelectProductAmount, { Mode } from "./SelectProductAmount";

type FirstColumnProps = {
  image: string;
  title: string;
};

type SecondColumnProps = {
  title: string;
  company: string;
  productColor: string;
};

type ThirdColumnProps = {
  amount: number;
  cartID: string;
};

export const FirstColumn = ({ image, title }: FirstColumnProps) => {
  return (
    <img src={image} alt={title} className="h-24 w-24 rounded-lg object-cover sm:h-32 sm:w-32" />
  );
};

export const SecondColumn = ({ title, company, productColor }: SecondColumnProps) => {
  return (
    <div className="sm:ml-4 sm:w-48 md:ml-12">
      <h3 className="font-medium capitalize">{title}</h3>
      <h4 className="mt-2 text-sm capitalize">{company}</h4>
      <p className="mt-4 flex items-center gap-x-2 text-sm capitalize">
        color:
        <span
          style={{
            width: "15px",
            height: "15px",
            borderRadius: "50%",
            backgroundColor: productColor,
          }}
        ></span>
      </p>
    </div>
  );
};

export const ThirdColumn = ({ amount, cartID }: ThirdColumnProps) => {
  const dispatch = useAppDispatch();

  function handleRemoveItemFromCart(): void {
    dispatch(removeItem(cartID));
  }

  function setAmount(value: number) {
    dispatch(editItem({ cartID, amount: value }));
  }

  return (
    <div>
      <SelectProductAmount amount={amount} setAmount={setAmount} mode={Mode.CartItem} />
      <Button variant="link" className="-ml-4" onClick={handleRemoveItemFromCart}>
        Remove Item
      </Button>
    </div>
  );
};

export const FourthColumn = ({ price }: { price: string }) => {
  return <p className="font-medium sm:ml-auto">{formatAsDollars(price)}</p>;
};
