import { Typography } from "@mui/material";
import Layout from "../../layout/layout";

const Error = () => {
  return (
    <Layout pageTitle="Page not found">
      <Typography sx={{ fontWeight: 800, fontSize: "32px", marginBottom: "20px" }}>
        Oops no page found!
      </Typography>
    </Layout>
  );
};
export default Error;
