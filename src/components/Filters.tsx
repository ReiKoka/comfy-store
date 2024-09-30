import { Form, Link, useLoaderData } from "react-router-dom";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";

import { Button } from "./ui/button";

import { ProductsResponseWithParams } from "@/utils";
import FormCheckbox from "./FormCheckbox";

function Filters() {
  const { meta, params } = useLoaderData() as ProductsResponseWithParams;
  const { search, company, category, shipping, order, price } = params;

  return (
    <Form className="grid items-center gap-4 rounded-md border px-8 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <FormInput
        label="search products"
        type="search"
        name="search"
        defaultValue={search}
      />
      <FormSelect
        label="select category"
        name="category"
        options={meta.categories}
        defaultValue={category}
      />
      <FormSelect
        label="select company"
        name="company"
        options={meta.companies}
        defaultValue={company}
      />
      <FormSelect
        label="order by"
        name="order"
        options={["a-z", "z-a", "high", "low"]}
        defaultValue={order}
      />
      <FormRange label="price" name="price" defaultValue={price} />
      <FormCheckbox
        label="free shipping"
        name="shipping"
        defaultValue={shipping}
      />

      <Button type="submit" size="sm" className="mb-2 self-end">
        Search
      </Button>

      <Button
        type="button"
        size="sm"
        variant="outline"
        className="mb-2 self-end"
      >
        <Link to="/products">Reset</Link>
      </Button>
    </Form>
  );
}

export default Filters;
