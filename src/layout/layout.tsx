import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import _ from "lodash";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { Role } from "../constants/constant";
import { useEffect } from "react";

interface Props {
  pageTitle?: string;
  children: any;
  isDeveloper?: boolean;
}
interface Path {
  to: string;
  displayName: string;
}
let paths: Path[] = [
  { to: "/technology", displayName: "Technology" },
  { to: "/questions", displayName: "Question bank" },
  { to: "/add-questions", displayName: "Add Questions" },
];

const Layout = (props: Props) => {
  const { children, pageTitle, isDeveloper = false } = props;
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const role = _.get(user, "role", Role.Developer);
  if (_.isEqual(role, "developer")) {
    paths = [{ to: "/start-test", displayName: "Start Test" }];
  }
  const userRole = _.get(user, "role", Role.Developer);
  useEffect(() => {
    if (_.isEqual(userRole, Role.Admin) && isDeveloper) {
      navigate("/technology");
    } else if (_.isEqual(userRole, Role.Developer) && !isDeveloper) {
      navigate("/start-test");
    }
  }, []);

  return (
    <Box sx={{ minHeight: pageTitle ? "calc(100vh - 64px)" : "100vh" }}>
      {pageTitle && (
        <AppBar sx={{ backgroundColor: "#6c00ea" }}>
          <Toolbar>
            <Typography
              sx={{ fontSize: "32px", fontFamily: "Rubik, sans-serif" }}
            >
              {" "}
              {pageTitle}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "50%",
              }}
            >
              {_.map(paths, (path) => {
                return (
                  <Link to={path.to} style={webStyles.linkStyle}>
                    {path.displayName}
                  </Link>
                );
              })}
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
