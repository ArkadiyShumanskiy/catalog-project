import { Routes as RDRoutes, Route } from "react-router-dom";

import { Authorize } from "./pages/Authorize";
import { User } from "./pages/User";
import { Catalog } from "./pages/Catalog";
import { Cart } from "./pages/Cart";
import { Layout } from "./components/Layout";

export const Routes = () => (
  <RDRoutes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Catalog />} />
      <Route path="/user" element={<User />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/authorize" element={<Authorize />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  </RDRoutes>
);
