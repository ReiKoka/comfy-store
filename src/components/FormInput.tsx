import { FormProps } from "@/utils";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

type FormInputProps = FormProps & { type: string };

function FormInput({ label, type, name, defaultValue }: FormInputProps) {
  return (
    <div>
      <div className="mb-2">
        <Label htmlFor={name} className="capitalize">
          {label || name}
        </Label>
        <Input id={name} name={name} type={type} defaultValue={defaultValue} />
      </div>
    </div>
  );
}

export default FormInput;
