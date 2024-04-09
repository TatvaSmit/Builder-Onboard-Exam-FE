import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  switchClasses,
} from "@mui/material";
import _ from "lodash";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { Role } from "../constants/constant";
import { useEffect, useState } from "react";
import { getLoggedInUser } from "../services/userServices";
import { setLoggedInUserData } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import apiCall from "../config/apiCall";
import { openModal } from "../redux/slices/modalSlice";
import { IPath } from "../constants/Interface";

interface Props {
  pageTitle?: string;
  children: any;
  isDeveloper?: boolean;
  isPublic?: boolean;
}

let pathsInfo: IPath[] = [
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
  const userName = _.get(user, "name", null);
  const userEmail = _.get(user, "email", null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [paths, setPaths] = useState(pathsInfo);
  const open = Boolean(anchorEl);

  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const clearDataAndLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const handleLogout = () => {
    setAnchorEl(null);
    clearDataAndLogout();
  };

  const getUserData = async () => {
    const { response, error } = await apiCall(getLoggedInUser);
    const code = _.get(error, "code", "500");
    if (_.isEqual(code, 401)) {
      if (!isPublic) {
        const statusText = _.get(error, "statusText", "Error");
        const description = _.get(error, "data.message", "unknown error");
        dispatch(openModal({ type: "error", description: description, title: statusText }));
      }
      clearDataAndLogout();
    }
    const userData = _.get(response, "data", null);
    dispatch(setLoggedInUserData(userData));
    return userData;
  };

  const redirectAccordingly = (userRole: string | null, userId: number | null) => {
    switch (true) {
      case _.isEqual(userRole, Role.Admin) && (isPublic || isDeveloper):
        navigate("/technology");
        break;
      case _.isEqual(userRole, Role.Developer) && (!isDeveloper || isPublic):
        navigate("/start-test");
        break;
      case !(userId && _.includes(Object.values(Role), userRole)):
        setPaths([]);
        navigate("/sign-in");
        break;
      case _.isEqual(userRole, Role.Developer):
        setPaths([{ to: "/start-test", displayName: "Start Test" }]);
        break;
      default:
      //
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!userId && token) {
      getUserData().then((user) => {
        if (user) {
          redirectAccordingly(_.get(user, "role", null), _.get(user, "id", null));
        }
      });
    } else if (token) {
      redirectAccordingly(userRole, userId);
    } else {
      redirectAccordingly(null, null);
    }
  }, []);

  return (
    <Box sx={{ minHeight: pageTitle ? "calc(100vh - 64px)" : "100vh" }}>
      {pageTitle && (
        <AppBar sx={{ border: "1px solid #6c00ea", background: "transparent", boxShadow: "none" }}>
          <Toolbar>
            <Typography sx={webStyles.pageTitle}> {pageTitle}</Typography>
            <Box sx={webStyles.navLinks}>
              {_.map(paths, (path) => {
                const pathName = window.location.pathname;
                const isActive = _.isEqual(pathName, _.get(path, "to", "/"));
                return (
                  <Link
                    to={path.to}
                    style={isActive ? webStyles.activeLinkStyle : webStyles.linkStyle}
                  >
                    {path.displayName}
                  </Link>
                );
              })}
            </Box>
            {!isPublic && (
              <>
                <IconButton sx={{ marginLeft: "auto" }} onClick={handleOpenProfileMenu}>
                  <Avatar sx={{ border: "1px solid #6c00ea" }}>{userName?.charAt(0)}</Avatar>
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseProfileMenu}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem disabled>{userEmail}</MenuItem>
                  <MenuItem disabled>{userRole}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
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
    color: "black",
    margin: "0 auto",
    lineHeight: "auto",
    padding: "5px 10px",
  },
  activeLinkStyle: {
    color: "#6c00ea",
    textDecoration: "none",
    backgroundColor: "#f4eaff",
    borderRadius: "20px",
    padding: "5px 10px",
  },
  navLinks: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "400px",
  },
  pageTitle: { fontSize: "28px", marginRight: "40px", color: "black" },
};
