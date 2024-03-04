import { Box, Button, ButtonProps, makeStyles, styled } from "@mui/material";

interface Props {
  variant?: string;
  children: React.ReactNode;
  backgroundColor?: string;
  fontColor?: string;
  textTransform?: string;
  borderRadius?: string;
  fontWeight?: string;
  fontSize?: string;
  margin?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  border?: string;
  minWidth?: string;
  disabled?: boolean;
}

const StyledButton = styled(Button)<any>`
  &.MuiButton-root.MuiButtonBase-root {
    background-color: ${(props: Props) => props.backgroundColor || "#6c00ea"};
    text-transform: ${(props: Props) => props.textTransform || "capitalize"};
    border-radius: ${(props: Props) => props.borderRadius || "initial"};
    font-weight: ${(props: Props) => props.fontWeight || "unset"};
    font-size: ${(props: Props) => props.fontSize || "unset"};
    margin: ${(props: Props) => props.margin || "0"};
    color: ${(props: Props) => props.fontColor || "black"};
    height: ${(props: Props) => props.height || "auto"};
    width: ${(props: Props) => props.width || "auto"};
    border: ${(props: Props) => props.border || "none"};
    min-width: ${(props: Props) => props.minWidth || "50px"};
    font-family: Rubik, sans-serif;
  }
  &.MuiButtonBase-root.MuiButton-root.Mui-disabled {
    color: white;
    background-color: #e2e2e2;
  }
`;

const MuiButton = (props: Props) => {
  const {
    children,
    fontSize,
    fontWeight,
    variant,
    fontColor,
    textTransform,
    borderRadius,
    backgroundColor,
    margin,
    height,
    width,
    onClick,
    disabled,
    border,
  } = props;
  return (
    <StyledButton
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      borderRadius={borderRadius}
      textTransform={textTransform}
      variant={variant}
      fontSize={fontSize}
      border={border}
      fontWeight={fontWeight}
      margin={margin}
      height={height}
      width={width}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default MuiButton;
