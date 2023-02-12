import { useState } from "react";
import { Alert, Row, Col, Button } from "reactstrap";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { getProductById } from '../../api';
import { addItem } from "../../store/cartSlice";
import { addToFavorites } from "../../store/favoriteSlice";
import { actionButtonStyle, buttonStyle } from '../../constants/styles';

import styles from "./CatalogItem.module.css";

export const Product = () => {
  const token = useSelector((state) => state.tokenSlice.token);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [productError, setProductError] = useState();

  const productQuery = useQuery(["user", productId], async () => {
    const response = await getProductById(token, productId);

    if (!response.ok) {
      setProductError(response.statusText);
    } else {
      return response.json();
    }
  }, { enabled: Boolean(productId) });

  return (
    <>
      {productError && (
        <Alert color="danger">
          {productError}
        </Alert>
      )}
      {!productError && (
        <Row>
          <Col xs={3}>
            <img src={productQuery.data?.pictures} style={{ width: 180 }} />
          </Col>
          <Col xs={9}>
            <p className={styles.price}>{productQuery.data?.price} ₽</p>
            <p className={styles.stock}>{productQuery.data?.stock} шт</p>
            <p className={styles.name}>{productQuery.data?.name}</p>
            <p className={styles.name}>{productQuery.data?.description}</p>
            <Button style={actionButtonStyle} onClick={() => dispatch(addItem(productId))}>
              В корзину
            </Button>
            <Button outline style={{ ...buttonStyle, marginLeft: 8 }} onClick={() => dispatch(addToFavorites(productId))}>В избранное</Button>
          </Col>
        </Row>
      )}
    </>
  );
};
