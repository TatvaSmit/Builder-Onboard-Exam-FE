import { FormControl, InputBaseComponentProps, TextField, styled } from "@mui/material";
import "./MuiInput.css";

interface Props {
  label?: string;
  helperText?: string;
  error?: boolean;
  value?: any;
  name?: string;
  disabled?: boolean;
  width?: string;
  type?: string;
  multiline?: boolean;
  placeholder?: string;
  rows?: number;
  fullWidth?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  inputProps?: InputBaseComponentProps | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const StyledInput = styled(TextField)<any>`
  .MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline,
  .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #6c00ea;
  }

  & .MuiInputBase-root.MuiOutlinedInput-root {
    border-radius: 4px;
    padding-left: 0;
    font-family: Rubik, sans-serif;
  }
`;

const Input = (props: Props) => {
  const {
    value,
    width,
    name,
    type,
    fullWidth,
    rows,
    startAdornment,
    endAdornment,
    placeholder,
    multiline,
    onChange,
    helperText,
    error,
    inputProps,
    label,
    disabled,
  } = props;
  return (
    <>
      <FormControl className="form-control" fullWidth={fullWidth}>
        {label && (
          <label htmlFor="my-input" className="label">
            {label}
          </label>
        )}
        <StyledInput
          sx={{ width: width ? width : "auto" }}
          id="my-input"
          type={type}
          name={name}
          rows={rows}
          disabled={disabled}
          placeholder={placeholder}
          multiline={multiline}
          value={value}
          onChange={onChange}
          helperText={helperText}
          error={error}
          InputProps={{ startAdornment: startAdornment, endAdornment: endAdornment }}
          inputProps={inputProps}
        />
      </FormControl>
    </>
  );
};

export default Input;
