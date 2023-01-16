import { useState } from "react";
import Container from "react-bootstrap/Container";
import { QueryClient, QueryClientProvider } from "react-query";

import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { User } from "./pages/User";

import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient();

function App() {
  const isRegisteredInStorage = Boolean(localStorage.getItem("registered"));
  const [isRegistered, setIsRegistered] = useState(isRegisteredInStorage);
  const isAuthorizedInStorage = Boolean(localStorage.getItem("authorized"));
  const [isAuthorized, setIsAuthorized] = useState(isAuthorizedInStorage);
  const [page, setPage] = useState("catalog");

  return (
    <QueryClientProvider client={queryClient}>
      <Header onOpenUserPageClick={setPage} isAuthorized={isAuthorized} />
      <Container>
        {page === "catalog" && (
          <Main
            isRegistered={isRegistered}
            isAuthorized={isAuthorized}
            setIsRegistered={setIsRegistered}
            setIsAuthorized={setIsAuthorized}
          />
        )}
        {page === "user" && <User />}
      </Container>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
