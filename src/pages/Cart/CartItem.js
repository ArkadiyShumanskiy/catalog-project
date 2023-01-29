import { useDispatch, useSelector } from "react-redux";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { removeItem, setItemCount, checkItem, uncheckItem } from "../../store/cartSlice";

import styles from "./CartItem.module.css";

export const CartItem = (props) => {
  const { pictures, name, price, stock, description, _id: id, onRemove } = props;
  const dispatch = useDispatch();
  const count = useSelector((state) => state.cartSlice.items.find((item) => item.id === id)?.count);
  const isItemChecked = useSelector((state) => state.cartSlice.chosenItemsIds?.some((item) => item === id));
  const items = useSelector((state) => state.cartSlice.items);

  const remove = (id) => {
    dispatch(removeItem(id));
    const itemsIds = items.filter((itemId) => itemId.id !== id).map((itemId) => itemId.id);
    onRemove(itemsIds);
  };

  return (
    <Row className={styles.row}>
      <Col xs={1}>
        <Form.Check type="checkbox" checked={isItemChecked} onChange={() => isItemChecked ? dispatch(uncheckItem(id)) : dispatch(checkItem(id))} />
      </Col>
      <Col xs={2}><img src={pictures} className={styles.img} /></Col>
      <Col xs={4}>
        <div>{name}</div>
        <div>{description}</div>
      </Col>
      <Col xs={1}>
        <Form.Control
          type="number"
          value={count}
          min={1}
          max={stock ?? 1}
          onChange={(event) => dispatch(setItemCount({ id, count: event.target.value }))}
        />
      </Col>
      <Col xs={2} className={styles.price}>{price} ₽</Col>
      <Col xs={2} className={styles.price}>
        <Button variant="danger" onClick={() => remove(id)}>X</Button>
      </Col>
    </Row>
  );
};
