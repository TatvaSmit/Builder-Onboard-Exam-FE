import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  MenuList,
  Select,
  styled,
} from "@mui/material";

interface Props {
  value?: string | number | null;
  mb?: string;
  width?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  menuList: Array<any>;
  fullWidth?: boolean;
  label?: string;
  fontFamily?: string;
  name?: string;
  error?: boolean;
  errorMsg?: string;
}

const StyledInputLabel = styled(InputLabel)<any>`
  &.MuiFormLabel-root.MuiInputLabel-root.Mui-focused {
    color: #6c00ea !important;
  }
  ,
  &.MuiFormLabel-root.MuiInputLabel-root {
    font-family: ${(props: any) => props.fontFamily || "auto"};
  }
`;

const StyledSelect = styled(Select)<any>`
  &.MuiInputBase-root.MuiOutlinedInput-root:hover
    .MuiOutlinedInput-notchedOutline {
    border-color: #6c00ea;
  }
  ,
  &.MuiInputBase-root.MuiOutlinedInput-root.Mui-focused
    .MuiOutlinedInput-notchedOutline {
    border: 1px solid #6c00ea;
  }
  ,
  &.MuiInputBase-root.MuiOutlinedInput-root {
    width: ${(props: any) => props.width || "auto"};
    margin-bottom: ${(props: any) => props.mb || 0};
    font-family: ${(props: any) => props.fontFamily || "Rubik, sans-serif"};
    border-radius:8px;
  }
  ,
  &.Mui-focused {
    color: #6c00ea;
    font-family: ${(props: any) => props.fontFamily || "Rubik, sans-serif"};
  }
  ,
`;

const MuiSelect = (props: Props) => {
  const {
    value,
    onChange,
    fullWidth,
    mb,
    width,
    menuList,
    label,
    fontFamily,
    name,
    error,
    errorMsg,
  } = props;
  return (
    <>
      <FormControl fullWidth={fullWidth} className="select-form-control">
        {label && (
          <StyledInputLabel fontFamily={fontFamily} id="label">
            {label}
          </StyledInputLabel>
        )}
        <StyledSelect
          mb={mb}
          width={width}
          label={label}
          name={name}
          fontFamily={fontFamily}
          variant="outlined"
          sx={{ width: "500px" }}
          className="select"
          labelId="label"
          id="select"
          value={value}
          placeholder="Select Technology"
          onChange={onChange}
          error={error}
        >
          {menuList.map((menuItem) => {
            return <MenuItem value={menuItem.id}>{menuItem.name}</MenuItem>;
          })}
          {!menuList.length && <MenuItem disabled>No items</MenuItem>}
        </StyledSelect>
        <FormHelperText style={{ color: "#d32f2f", margin: `-${mb} 0 ${mb} 0` }}>
          {errorMsg}
        </FormHelperText>
      </FormControl>
    </>
  );
};
export default MuiSelect;
