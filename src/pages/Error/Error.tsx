import { Box, Typography } from "@mui/material";
import Layout from "../../layout/layout";
import { notFound } from "../../assets";

const Error = () => {
  return (
    <Layout pageTitle="Page not found">
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <img style={{ width: "700px" }} src={notFound} alt="" />
      </Box>
    </Layout>
  );
};
export default Error;
