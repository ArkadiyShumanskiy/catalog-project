import { useEffect, useState } from "react";

import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import { Catalog } from "../pages/Catalog";

export const Main = (props) => {
  const { isRegistered, isAuthorized, setIsRegistered, setIsAuthorized } =
    props;

  if (isRegistered === false) {
    return <SignUp setIsRegistered={setIsRegistered} />;
  }

  if (isAuthorized === false) {
    return <SignIn setIsAuthorized={setIsAuthorized} />;
  }

  return (
    <div>
      <Catalog />
    </div>
  );
};
