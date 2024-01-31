import { Radio, styled } from "@mui/material";

interface Props {
  checked?: boolean;
  onChange?: () => void;
  value?: string;
  disabled?: boolean;
}

const StyledRadio = styled(Radio)<Props>`
  &.MuiButtonBase-root.MuiRadio-root.Mui-checked {
    color: #6c00ea;
  }
`;

function MuiRadioButton(props: Props) {
  const { onChange, value, checked, disabled = false } = props;
  return <StyledRadio checked={checked} value={value} disabled={disabled} onChange={onChange} />;
}

export default MuiRadioButton;
