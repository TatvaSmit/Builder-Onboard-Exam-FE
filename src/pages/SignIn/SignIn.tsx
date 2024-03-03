import { Suspense, lazy, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Theme,
  Tooltip,
  makeStyles,
  styled,
} from "@mui/material";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { login } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import _ from "lodash";
import { Role } from "../../constants/constant";

const Input = lazy(() => import("../../components/Input/MuiInput"));
const Layout = lazy(() => import("../../layout/layout"));
const MuiButton = lazy(() => import("../../components/Button/MuiButton"));

const Errors = () => {
  return <>"This is UI "</>;
};
const SignIn = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [signupData, setSignUpdata] = useState({ email: "", password: "" });
  const user = useSelector((state: RootState) => state.user);
  if (_.get(user, "id", null)) {
    const role = _.get(user, "role", Role.Developer);
    _.isEqual(role, Role.Developer)
      ? navigate("/start-test")
      : navigate("/technology");
  }
  // const { resetBoundary, showBoundary } = useErrorBoundary();
  const handleSignIn = async () => {
    const res = await login(signupData).catch((error) => {
      // showBoundary(error);
    });
    console.log(res);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setSignUpdata((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      <Suspense fallback="loading">
        <ErrorBoundary fallback={<Errors />}>
          <Layout>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
              }}
            >
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
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default SignIn;
