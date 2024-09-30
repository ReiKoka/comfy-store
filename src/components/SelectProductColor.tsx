import { Button } from "./ui/button";

type SelectProductColorProps = {
  colors: string[];
  productColor: string;
  setProductColor: React.Dispatch<React.SetStateAction<string>>;
};

function SelectProductColor({ colors, productColor, setProductColor }: SelectProductColorProps) {
  return (
    <div className="mt-6">
      <h4 className="text-base font-medium capitalize tracking-wider">Colors</h4>
      <div className="mt-2 flex gap-x-1">
        {colors.map((color) => {
          return (
            <Button
              key={color}
              type="button"
              className={`h-6 w-6 rounded-full border-2 p-0 ${color === productColor && "border-primary"}`}
              style={{ backgroundColor: color }}
              onClick={() => setProductColor(color)}
            ></Button>
          );
        })}
      </div>
    </div>
  );
}

export default SelectProductColor;
