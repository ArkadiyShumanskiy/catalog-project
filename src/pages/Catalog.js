import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useQuery } from "react-query";

import { CatalogItem } from "./CatalogItem";
import { getCatalog } from "../api";

import styles from "./Catalog.module.css";

export const Catalog = () => {
  const catalogQuery = useQuery("catalog", async () => {
    const response = await getCatalog();

    if (!response.ok) {
      console.log(response);
    }

    return response.json();
  });

  return (
    <div className={styles.catalog}>
      {catalogQuery.data?.products.map((item) => (
        <CatalogItem key={item._id} {...item} />
      ))}
    </div>
  );
};
