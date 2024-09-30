import { CartButton, LinksDropdown, Logo, ModeToggle, NavLinks } from ".";

function Navbar() {
  return (
    <nav className="bg-muted py-4">
      <div className="align-element flex items-center justify-between">
        <Logo />
        <LinksDropdown />
        <NavLinks />
        <div className="flex items-center justify-center gap-x-4">
          <ModeToggle />
          <CartButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
