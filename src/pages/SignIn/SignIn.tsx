import { Suspense, lazy, useState } from "react";
import { Box, Button, Grid, Theme, Tooltip, Typography, makeStyles, styled } from "@mui/material";
import { getLoggedInUser, login } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import _ from "lodash";
import { Role } from "../../constants/constant";
import { useDispatch } from "react-redux";
import { setLoggedInUserData } from "../../redux/slices/userSlice";
const Input = lazy(() => import("../../components/Input/MuiInput"));
const Layout = lazy(() => import("../../layout/layout"));
const MuiButton = lazy(() => import("../../components/Button/MuiButton"));

export const Errors = () => {
  return <>"This is UI "</>;
};

const SignIn = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupData, setSignUpdata] = useState({ email: "", password: "" });

  const handleSignIn = async () => {
    const res = await login(signupData).catch((error) => {
      console.log(error);
    });
    const token = _.get(res, "data.token", null);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      const user = await getLoggedInUser().catch((error) => console.log(error));
      const userData = _.get(user, "data", null);
      dispatch(setLoggedInUserData(userData));
      const role = _.get(userData, "role", null);
      if (_.isEqual(role, Role.Admin)) {
        navigate("/technology");
      } else {
        navigate('/start-test')
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setSignUpdata((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  return (
    <>
      <Suspense fallback="loading">
        <Layout pageTitle="Sign In" isPublic>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "calc(100vh - 64px)",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Rubik,sans-serif",
                fontWeight: 800,
                fontSize: "32px",
                marginBottom: "20px",
              }}
            >
              Sign In
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Input
                onChange={handleOnChange}
                value={signupData.email}
                width="500px"
                name="email"
                label={"Email"}
                type="email"
                placeholder="Enter your email"
              />
            </Box>
            <Box sx={{ mb: 4 }}>
              <Input
                onChange={handleOnChange}
                value={signupData.password}
                name="password"
                width="500px"
                label={"Password"}
                type="password"
                placeholder="Enter your password"
              />
            </Box>
            <MuiButton
              onClick={handleSignIn}
              backgroundColor="#6c00ea"
              fontColor="white"
              variant="contained"
              borderRadius="4px"
            >
              Sign in
            </MuiButton>
          </Box>
        </Layout>
      </Suspense>
    </>
  );
};

export default SignIn;
