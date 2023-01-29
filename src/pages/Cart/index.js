import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import { CartItem } from "./CartItem";
import { getProductsByIds } from "../../api";

import styles from './Cart.module.css'

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = useSelector((state) => state.tokenSlice.token);
  const items = useSelector((state) => state.cartSlice.items);
  const chosenItems = useSelector((state) => state.cartSlice.chosenItemsIds);
  const itemsIds = items.map((itemId) => itemId.id);

  const fetchProducts = async (itemsIds) => {
    const response = await getProductsByIds(token, itemsIds);

    setCartItems(response);
  };

  useEffect(() => {
    fetchProducts(itemsIds);
  }, []);

  const chekout = () => {
    const chosenItemsSum = cartItems
      .filter((item) => chosenItems.includes(item._id))
      .reduce((sum, item) => {
        const chosenItemCount = items.find((chosenItem) => chosenItem.id === item._id)?.count ?? 0;
        sum += (item.price - item.price*item.discount/100) * chosenItemCount;
        return sum;
      }, 0);

    console.log(cartItems.filter((item) => chosenItems.includes(item._id)))

    alert(`Для оформления было выбрано ${chosenItems?.length} товаров на сумму ${chosenItemsSum} с учетом скидок`);
  };

  return (
    <>
      <div>
        {cartItems.length === 0 && (
          <div>Корзина пуста</div>
        )}
        {cartItems.map((item) => (
          <CartItem key={item._id} onRemove={fetchProducts} {...item} />
        ))}
      </div>
      <div>
        <Link to="/">В каталог</Link>
      </div>
      <div className={styles.actions}>
        <Button variant="success" disabled={!chosenItems?.length} onClick={chekout}>
          Перейти к оформлению
        </Button>
      </div>
    </>
  );
};
