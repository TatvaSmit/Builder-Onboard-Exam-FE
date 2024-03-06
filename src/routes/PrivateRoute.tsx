import { Navigate } from "react-router-dom";
import _ from "lodash";
import { FC, ReactNode } from "react";

const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/sign-in" />;
};
export default PrivateRoute;
