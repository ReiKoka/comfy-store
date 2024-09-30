import { useAppSelector } from "@/hooks";
import { links } from "@/utils";
import { NavLink } from "react-router-dom";

function NavLinks() {
  const user = useAppSelector((state) => state.userState.user);
  return (
    <div className="hidden items-center justify-center gap-x-4 lg:flex">
      {links.map((link) => {
        const restrictedRoutes = link.href === "checkout" || link.href === "orders";
        if (restrictedRoutes && !user) return null;
        return (
          <NavLink
            to={link.href}
            key={link.label}
            className={({ isActive }) => {
              return `font-light capitalize tracking-normal ${isActive ? "font-medium text-primary" : ""}`;
            }}
          >
            {link.label}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
