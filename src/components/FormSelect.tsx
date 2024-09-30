import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { FormProps } from "@/utils";

type FormSelectProps = FormProps & { options: string[] };

function checkItem(item: string): string {
  if (item === "high") {
    return "Price (Highest First)";
  } else if (item === "low") {
    return "Price (Lowest First";
  } else {
    return item;
  }
}

function FormSelect({ name, label, options, defaultValue }: FormSelectProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Select defaultValue={defaultValue || options[0]} name={name}>
        <SelectTrigger id={name} className="capitalize">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            return (
              <SelectItem className="capitalize" key={option} value={option}>
                {checkItem(option)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FormSelect;
