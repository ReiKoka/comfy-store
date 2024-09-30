import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

import { useAppSelector } from "@/hooks";

function CartButton() {
  const numItemsInCart = useAppSelector((state) => state.cartState.numItemsInCart);
  
  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="relative flex items-center justify-center"
    >
      <Link to="/cart">
        <ShoppingCart />
        <span className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  );
}

export default CartButton;
