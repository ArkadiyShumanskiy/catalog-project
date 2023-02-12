import { useState, useEffect, useMemo } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';

import { CartItem } from "./CartItem";
import { getProductsByIds } from "../../api";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = useSelector((state) => state.tokenSlice.token);
  const items = useSelector((state) => state.cartSlice.items);
  const chosenItems = useSelector((state) => state.cartSlice.chosenItemsIds);
  const itemsIds = useMemo(() => items.map((item) => item.id), [items]);

  const fetchProducts = async (itemsIds) => {
    const response = await getProductsByIds(token, itemsIds);

    setCartItems(response);
  };

  useEffect(() => {
    fetchProducts(itemsIds);
  }, [itemsIds]);

  const chekout = () => {
    const chosenItemsSum = cartItems
      .filter((item) => chosenItems.includes(item._id))
      .reduce((sum, item) => {
        const chosenItemCount = items.find((chosenItem) => chosenItem.id === item._id)?.count ?? 0;
        sum += (item.price - item.price*item.discount/100) * chosenItemCount;
        return sum;
      }, 0);

    alert(`Для оформления было выбрано ${chosenItems?.length} товаров на сумму ${chosenItemsSum} с учетом скидок`);
  };

  return (
    <>
      <div>
        {cartItems.length === 0 && (
          <div>Корзина пуста</div>
        )}
        {cartItems.map((item) => (
          <CartItem key={item._id} {...item} />
        ))}
      </div>
      <div>
        <Link to="/">В каталог</Link>
      </div>
      <div style={{ marginTop: 16, marginBottom: 8 }}>
        <Button variant="success" disabled={!chosenItems?.length} onClick={chekout}>
          Перейти к оформлению
        </Button>
      </div>
    </>
  );
};
