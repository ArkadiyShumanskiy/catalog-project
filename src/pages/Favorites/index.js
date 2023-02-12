import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FavoriteItem } from "./FavoriteItem";
import { getProductsByIds } from "../../api";

export const Favorites = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const token = useSelector((state) => state.tokenSlice.token);
  const favoriteItemsIds = useSelector((state) => state.favoriteSlice.items);

  const fetchProducts = async () => {
    const response = await getProductsByIds(token, favoriteItemsIds);

    setFavoriteItems(response);
  };

  useEffect(() => {
    fetchProducts(favoriteItemsIds);
  }, [favoriteItemsIds]);

  return (
    <>
      <div>
        {favoriteItems.length === 0 && (
          <div>Нет товаров в избранном</div>
        )}
        {favoriteItems.map((item) => (
          <FavoriteItem key={item._id} {...item} />
        ))}
      </div>
      <div>
        <Link to="/">В каталог</Link>
      </div>
    </>
  );
};
