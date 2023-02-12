import { Routes as RDRoutes, Route } from "react-router-dom";

import { User } from "./pages/User";
import { Catalog } from "./pages/Catalog";
import { Cart } from "./pages/Cart";
import { Layout } from "./components/Layout";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Favorites } from "./pages/Favorites";
import { Product } from "./pages/Catalog/Product";

export const Routes = () => (
  <RDRoutes>
    <Route path="/" element={<Layout />}>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/products">
        <Route index element={<Catalog />} />
        <Route path=":productId" element={<Product />} />
      </Route>
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/user" element={<User />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  </RDRoutes>
);
