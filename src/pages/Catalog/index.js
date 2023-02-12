import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { CatalogItem } from "./CatalogItem";
import { getProducts } from "../../api";

import styles from "./Catalog.module.css";

export const Catalog = () => {
  const token = useSelector((state) => state.tokenSlice.token);
  const isAuthorized = Boolean(token);

  const catalogQuery = useQuery(["products"], async () => {
    const response = await getProducts(token);

    if (!response.ok) {
      console.log(response);
    }

    return response.json();
  }, { enabled: isAuthorized });

  return (
    <div className={styles.catalog}>
      {catalogQuery.data?.products?.map((item) => (
        <CatalogItem key={item._id} {...item} />
      ))}
    </div>
  );
};
