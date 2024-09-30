import { formatAsDollars, ProductsResponse } from "@/utils";
import { Link, useLoaderData } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

function ProductsGrid() {
  const { data: products } = useLoaderData() as ProductsResponse;

  return (
    <div className="grid gap-4 pt-12 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { title, price, image } = product.attributes;
        const dollarsAmount = formatAsDollars(price);
        return (
          <Link to={`/products/${product.id}`} key={product.id}>
            <Card>
              <CardContent className="p-4">
                <img
                  src={image}
                  alt={title}
                  className="h-64 w-full rounded-md object-cover md:h-48"
                />
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-semibold capitalize">{title}</h2>
                  <p className="mt-2 font-light text-primary">
                    {dollarsAmount}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductsGrid;
