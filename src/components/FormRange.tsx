import { useState } from "react";

import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

import { formatAsDollars } from "@/utils/formatAsDollars";
import { FormProps } from "@/utils";

type FormRangeProps = FormProps;

function FormRange({ label, name, defaultValue }: FormRangeProps) {
  const step = 1000;
  const maxPrice = 100000;
  const defaultPrice = defaultValue ? Number(defaultValue) : maxPrice;

  const [selectedPrice, setSelectedPrice] = useState<number>(defaultPrice);

  return (
    <div className="mb-2">
      <Label
        htmlFor={name}
        className="flex items-center justify-between capitalize"
      >
        {label || name}
        <span>{formatAsDollars(selectedPrice)}</span>
      </Label>
      <Slider
        id={name}
        name={name}
        step={step}
        max={maxPrice}
        value={[selectedPrice]}
        onValueChange={(value) => setSelectedPrice(value[0])}
        className="mt-4"
      />
    </div>
  );
}

export default FormRange;
