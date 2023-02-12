import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardText, CardImg, Button } from "reactstrap";
import { useDispatch } from "react-redux";

import { addItem } from "../../store/cartSlice";
import { actionButtonStyle } from '../../constants/styles';

import styles from "./CatalogItem.module.css";

export const CatalogItem = (props) => {
  const { pictures, likes, name, price, stock, description, _id: id } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = (event, itemId) => {
    event.stopPropagation();
    dispatch(addItem(itemId));
  }

  return (
    <Card style={{ width: "18rem", cursor: 'pointer' }} onClick={() => navigate(`/products/${id}`)}>
      <CardImg src={pictures} />
      <CardBody>
        <CardText className={styles.price}>{price} ₽</CardText>
        <CardText className={styles.stock}>{stock} шт</CardText>
        <CardText className={styles.name}>{name}</CardText>
        <Button style={actionButtonStyle} onClick={(event) => addToCart(event, id)}>
          В корзину
        </Button>
      </CardBody>
    </Card>
  );
};
