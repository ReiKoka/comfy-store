import { FormProps } from "@/utils";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

type FormCheckboxProps = FormProps;

function FormCheckbox({ label, name, defaultValue }: FormCheckboxProps) {
  const defaultChecked = defaultValue === "on" ? true : false;
  return (
    <div className="mb-2 flex justify-between self-end">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Checkbox
        id={name}
        name={name}
        defaultChecked={defaultChecked}
        className="rounded-[4px] "
      />
    </div>
  );
}

export default FormCheckbox;
