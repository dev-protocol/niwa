import { FunctionComponent } from "react";

interface FormInputProps {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
}

const FormInput: FunctionComponent<FormInputProps> = ({
  id,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      className="border-2 border-grey-500 rounded px-2 w-full"
      id={id}
      placeholder={placeholder ?? ""}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default FormInput;
