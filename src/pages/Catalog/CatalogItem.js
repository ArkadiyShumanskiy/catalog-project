import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";

import { addItem } from "../../store/cartSlice";

import styles from "./CatalogItem.module.css";

export const CatalogItem = (props) => {
  const { pictures, likes, name, price, stock, description, _id: id } = props;
  const dispatch = useDispatch();

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={pictures} />
      <Card.Body>
        <Card.Text className={styles.price}>{price} ₽</Card.Text>
        <Card.Text className={styles.stock}>{stock} шт</Card.Text>
        <Card.Text className={styles.name}>{name}</Card.Text>
        <button className={styles.button} onClick={() => dispatch(addItem(id))}>
          В корзину
        </button>
      </Card.Body>
    </Card>
  );
};
