import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import ProductsList from "./ProductsList";
import { type ProductsResponse } from "@/utils";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import ProductsGrid from "./ProductsGrid";

function ProductsContainer() {
  const { meta } = useLoaderData() as ProductsResponse;
  const totalProducts = meta.pagination.total;
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  return (
    <>
      <section>
        <div className="mt-8 flex items-center justify-between">
          <h4 className="text-md font-medium">
            {totalProducts} {totalProducts > 1 ? "products" : "product"}
          </h4>
          <div className="flex gap-x-4">
            <Button
              onClick={() => setLayout("grid")}
              variant={layout === "grid" ? "default" : "ghost"}
              size="icon"
            >
              <LayoutGrid />
            </Button>
            <Button
              onClick={() => setLayout("list")}
              variant={layout === "list" ? "default" : "ghost"}
              size="icon"
            >
              <List />
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>

      <div>
        {totalProducts === 0 ? (
          <h5 className="mt-16 text-2xl">
            Sorry, no products matched your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
}

export default ProductsContainer;
