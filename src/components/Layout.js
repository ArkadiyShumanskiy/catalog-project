import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Container } from "reactstrap";
import { useSelector } from "react-redux";

import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
  const { token, registered } = useSelector((state) => state.tokenSlice);
  const isAuthorized = Boolean(token);
  const navigate = useNavigate();
  const { pathname } = useLocation()

  useEffect(() => {
    if (!registered) {
      navigate('/signup')
    } else if (!isAuthorized) {
      navigate('/signin')
    } else { // registered and authorized
      navigate(pathname === '/' || pathname === '/signup' || pathname === '/signin' ? '/products' : pathname);
    }
  }, [isAuthorized, navigate, pathname, registered])

  return (
    <>
        <Header />
        <Container style={{ paddingTop: 24, paddingBottom: 24 }}>
          <Outlet />
        </Container>
        <Footer />
    </>
  );
}
