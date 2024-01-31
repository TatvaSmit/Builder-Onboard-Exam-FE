import { Checkbox, styled } from "@mui/material";
import { MouseEventHandler } from "react";

interface Props {
  handleClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  checked?: boolean;
}
const StyledCheckbox = styled(Checkbox)<Props>`
  &.MuiButtonBase-root.MuiCheckbox-root.Mui-checked,
  &.MuiButtonBase-root.MuiCheckbox-root.MuiCheckbox-indeterminate {
    color: white;
  }
  &.MuiButtonBase-root.MuiCheckbox-root {
    // color: black;
  }
`;

const MuiCheckbox = (props: Props) => {
  const { handleClick, checked } = props;
  return (
    <>
      <StyledCheckbox checked={checked} onClick={handleClick} />
    </>
  );
};
export default MuiCheckbox;
