import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import styles from "./CatalogItem.module.css";

export const CatalogItem = (props) => {
  const { pictures, likes, name, price, stock, description } = props;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={pictures} />
      <Card.Body>
        <Card.Text className={styles.price}>{price} ₽</Card.Text>
        <Card.Text className={styles.stock}>{stock} шт</Card.Text>
        <Card.Text className={styles.name}>{name}</Card.Text>
        <Button className={styles.button} variant="primary">
          В корзину
        </Button>
      </Card.Body>
    </Card>
  );
};
