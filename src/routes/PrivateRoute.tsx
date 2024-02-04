import { useSelector } from "react-redux";
import { Navigate, RouteProps, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import _ from "lodash";
import { FC, ReactNode } from "react";

const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);
  return _.get(user, "id", null) ? <>{children}</> : <Navigate to="/sign-in" />;
};
export default PrivateRoute;
