import { Link } from "react-router-dom";
import HeroCarousel from "./HeroCarousel";
import { Button } from "./ui/button";

function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          We are changing the way people shop
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          provident sapiente ipsum obcaecati dolor optio ea ducimus mollitia
          saepe. Cumque officia labore fuga vero obcaecati possimus iusto
          aperiam expedita dolore.
        </p>
        <Button asChild size='lg' className="mt-10">
          <Link to='/products'>Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}

export default Hero;
