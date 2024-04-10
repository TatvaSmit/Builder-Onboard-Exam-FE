import { Box } from "@mui/material";
import Layout from "../../layout/layout";
import { notFound } from "../../assets";

const Error = () => {
  return (
    <Layout pageTitle="Page not found">
      <Box sx={webStyles.pageWrapper}>
        <img style={webStyles.imageStyle} src={notFound} alt="" />
      </Box>
    </Layout>
  );
};

export default Error;

const webStyles = {
  pageWrapper: { display: "flex", flexDirection: "column", alignItems: "center" },
  imageStyle: { width: "700px" }
};
