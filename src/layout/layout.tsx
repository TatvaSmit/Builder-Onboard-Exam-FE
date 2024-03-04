import { AppBar, Box, Toolbar, Typography, switchClasses } from "@mui/material";
import _ from "lodash";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { Role } from "../constants/constant";
import { useEffect } from "react";
import { getLoggedInUser } from "../services/userServices";
import { setLoggedInUserData } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

interface Props {
  pageTitle?: string;
  children: any;
  isDeveloper?: boolean;
  isPublic?: boolean;
}

interface Path {
  to: string;
  displayName: string;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

let paths: Path[] = [
  { to: "/technology", displayName: "Technology" },
  { to: "/questions", displayName: "Question bank" },
  { to: "/add-question", displayName: "Add Question" },
];

const Layout = (props: Props) => {
  const { children, pageTitle, isDeveloper = false, isPublic = false } = props;
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = _.get(user, "role", null);
  const userId = _.get(user, "id", null);

  const getUserData = async (): Promise<User | null> => {
    const user = await getLoggedInUser().catch((error) => console.log(error));
    const userData = _.get(user, "data", null);
    dispatch(setLoggedInUserData(userData));
    return userData;
  };

  const redirectAccordingly = (userRole: string | null) => {
    switch (true) {
      case _.isEqual(userRole, Role.Admin) && (isPublic || isDeveloper):
        console.log("q");
        navigate("/technology");
        break;
      case _.isEqual(userRole, Role.Developer) && (!isDeveloper || isPublic):
        navigate("/start-test");
        break;
      case !(userId && _.includes(Object.values(Role), userRole)):
        paths = [];
        navigate("/sign-in");
        break;
      case _.isEqual(userRole, Role.Developer):
        paths = [{ to: "/start-test", displayName: "Start Test" }];
        break;
      default:
      //
    }
  };

  useEffect(() => {
    if (!userId) {
      getUserData().then((user: User | null) => {
        if (user) {
          redirectAccordingly(_.get(user, "role", null));
        }
      });
    }
  }, []);
  return (
    <Box sx={{ minHeight: pageTitle ? "calc(100vh - 64px)" : "100vh" }}>
      {pageTitle && (
        <AppBar sx={{ backgroundColor: "#6c00ea" }}>
          <Toolbar>
            <Typography sx={webStyles.pageTitle}> {pageTitle}</Typography>
            <Box sx={webStyles.navLinks}>
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
  navLinks: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "400px",
  },
  pageTitle: { fontSize: "28px", marginRight: "40px" },
};
