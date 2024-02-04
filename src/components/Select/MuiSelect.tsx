import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  MenuList,
  Select,
  styled,
} from "@mui/material";

interface Props {
  value?: string;
  mb?: string;
  width?: string;
  onChange?: () => void;
  menuList: Array<any>;
  fullWidth?: boolean;
  label?: string;
}

const StyledInputLabel = styled(InputLabel)<any>`
  &.MuiFormLabel-root.MuiInputLabel-root.Mui-focused{
    color: #6c00ea !important;
  },
`;

const StyledSelect = styled(Select)<any>`
  &.MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: #6c00ea
  },
  &.MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #6c00ea
  },
  &.MuiInputBase-root.MuiOutlinedInput-root {
    width:${(props: any) => props.width || "auto"};
    margin-bottom: ${(props: any) => props.mb || 0}
  },
  & .Mui-focused {
    color: #6c00ea;
    font-family: Rubik, sans-serif
  },
`;

const MuiSelect = (props: Props) => {
  const { value, onChange, fullWidth, mb, width, menuList, label } = props;
  return (
    <>
      <FormControl fullWidth={fullWidth} className="select-form-control">
        {label && <StyledInputLabel id="label">{label}</StyledInputLabel>}
        <StyledSelect
          mb={mb}
          width={width}
          label={label}
          variant="outlined"
          sx={{ width: "500px" }}
          className="select"
          labelId="label"
          id="select"
          value={value}
          placeholder="Select Technology"
          onChange={onChange}
        >
          {menuList.map((menuItem) => {
            return <MenuItem value={10}>{menuItem}</MenuItem>;
          })}
        </StyledSelect>
      </FormControl>
    </>
  );
};
export default MuiSelect;