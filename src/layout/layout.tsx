import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  pageTitle?: string;
  children: any;
}

const Layout = (props: Props) => {
  const { children, pageTitle } = props;
  return (
    <Box sx={{ minHeight: pageTitle ? "calc(100vh - 64px)" : "100vh" }}>
      {pageTitle && (
        <AppBar sx={{ backgroundColor: "#6c00ea" }}>
          <Toolbar>
            <Typography sx={{ fontSize: "32px" }}> {pageTitle}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "50%",
              }}
            >
              <Link to="/technology" style={webStyles.linkStyle}>
                Technology
              </Link>
              <Link to="/questions" style={webStyles.linkStyle}>
                Question bank
              </Link>
              <Link to="/add-questions" style={webStyles.linkStyle}>
                Add Questions
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      )}
      <Box sx={{ marginTop: pageTitle ? "64px" : "0px" }}>{children}</Box>
    </Box>
  );
};

export default Layout;

const webStyles = {
  linkStyle: {
    textDecoration: "none",
    color: "white",
  },
};
