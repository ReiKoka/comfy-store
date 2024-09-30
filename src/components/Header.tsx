
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toast } from "sonner";
import { clearCart } from "@/features/cart/cartSlice";
import { logoutUser } from "@/features/user/userSlice";
import { capitalizeWordsWithHyphen } from "@/utils";

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userState.user);

  const handleLogout = (): void => {
    dispatch(clearCart());
    dispatch(logoutUser());
    toast.info("Logged Out");
    navigate("/");
  };

  return (
    <header>
      <div className="align-element flex justify-center py-2 sm:justify-end">
        {/* USER */}
        {user ? (
          <div className="flex items-center gap-x-2 sm:gap-x-8">
            <p className="text-xs sm:text-sm">Hello, {capitalizeWordsWithHyphen(user.username)}</p>
            <Button variant="link" size="sm" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        ) : (
          <div className="-mr-4 flex items-center justify-center gap-x-6">
            <Button asChild variant="link" size="sm">
              <Link to="/login">Sign In / Guest</Link>
            </Button>
            <Button asChild variant="link" size="sm">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
