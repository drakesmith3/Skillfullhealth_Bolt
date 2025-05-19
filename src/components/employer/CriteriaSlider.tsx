import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import type { CriteriaSliderProps } from "./types";

export const CriteriaSlider: React.FC<CriteriaSliderProps> = ({
  title,
  description,
  value,
  min,
  max,
  step,
  onChange,
  labelFunction,
  weight
}) => {
  return (
    <div className="mb-8 p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Badge variant="outline" className="font-mono">Weight: {weight}x</Badge>
      </div>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      
      <div className="mb-6">
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onValueChange={onChange}
          className="my-5"
        />
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>{labelFunction ? labelFunction(min) : min}</span>
          <span className="font-semibold text-primary">Selected: {labelFunction ? labelFunction(value[0]) : value[0]}</span>
          <span>{labelFunction ? labelFunction(max) : max}</span>
        </div>
      </div>
    </div>
  );
};
