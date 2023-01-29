import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";

import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
  const token = useSelector((state) => state.tokenSlice.token);
  const isAuthorized = Boolean(token);
  const navigate = useNavigate();
  const { pathname } = useLocation()

  useEffect(() => {
    if (!isAuthorized) navigate('authorize')
    else navigate(pathname);
  }, [isAuthorized, navigate, pathname])

  return (
    <>
        <Header />
        <Container>
          <Outlet />
        </Container>
        <Footer />
    </>
  );
}
