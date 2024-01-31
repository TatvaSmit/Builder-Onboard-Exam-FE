import { Box } from "@mui/material";
import { Options } from "../../constants/constant";

interface Props {
  height?: string;
  width?: string;
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  color?: string;
  fontWeight?: string;
  fontSize?: string;
  borderRadius?: string;
  index: number;
}

const Option = (props: Props) => {
  const { index, padding, margin, backgroundColor, color, fontSize, borderRadius, height, width } =
    props;
  return (
    <Box
      sx={{
        display: "inline-flex",
        padding: padding || "0 10px",
        alignItems: "center",
        width: width || "50px",
        borderRadius: borderRadius || "8px 0 0 8px",
        justifyContent: "center",
        backgroundColor: backgroundColor || "#6c00ea",
        minHeight: height || "50px",
        color: color || "white",
        margin: margin || "0 20px 0 0",
      }}
    >
      {Options[index]}
    </Box>
  );
};
export default Option;
