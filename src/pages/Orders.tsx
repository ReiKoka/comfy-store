import { ComplexPaginationContainer, OrdersList, SectionTitle } from "@/components";
import { ReduxStore } from "@/store";
import { customFetch, OrdersResponse } from "@/utils";
import { LoaderFunction, redirect, useLoaderData } from "react-router-dom";
import { toast } from "sonner";

export function loader(store: ReduxStore): LoaderFunction {
  return async function ({ request }): Promise<OrdersResponse | Response | null> {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warning("Please login to continue");
      return redirect("/login");
    }

    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    try {
      const response = await customFetch.get<OrdersResponse>("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      return { ...response.data };
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders!");
      return null;
    }
  };
}

function Orders() {
  const { meta } = useLoaderData() as OrdersResponse;

  if (meta.pagination.total < 1) {
    return <SectionTitle text="Please make an order" />
  }
  
  return <>
    <SectionTitle text="Your Orders" />
    <OrdersList />
    <ComplexPaginationContainer />
  </>
}
export default Orders;
