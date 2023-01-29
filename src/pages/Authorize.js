import { useSelector } from "react-redux";

import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";

export const Authorize = (props) => {
  const { token, registered } = useSelector((state) => state.tokenSlice);
  const isAuthorized = Boolean(token);

  if (!registered) {
    return <SignUp />;
  }

  if (!isAuthorized) {
    return <SignIn />;
  }

  return null;
};
