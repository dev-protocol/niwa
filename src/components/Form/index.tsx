import { FunctionComponent } from "react";
import FormInput from "./FormInput";
import FormInputLabel from "./FormInputLabel";

interface FormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
}

const FormField: FunctionComponent<FormFieldProps> = ({
  label,
  id,
  required = false,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <FormInputLabel label={label} id={id} required={required} />
      <FormInput
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;
