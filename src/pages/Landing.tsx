import { FeaturedProducts, Hero } from "@/components";
import { customFetch, ProductsResponse } from "@/utils";
import { LoaderFunction } from "react-router-dom";

const url = "/products?features=true";

export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
  const response = await customFetch<ProductsResponse>(url);
  return { ...response.data };
};

function Landing() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}

export default Landing;
