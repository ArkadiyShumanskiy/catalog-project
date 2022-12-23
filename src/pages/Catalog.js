import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useEffect, useState } from "react";

import { CatalogItem } from "./CatalogItem";
import { getCatalog } from "../api";

import styles from "./Catalog.module.css";

export const Catalog = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getCatalog()
      .then((response) => {
        if (response.ok) {
          response.json().then((responseJson) => {
            setItems(responseJson.products);
          });
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.catalog}>
      {items.map((item) => (
        <CatalogItem key={item._id} {...item} />
      ))}
    </div>
  );
};
