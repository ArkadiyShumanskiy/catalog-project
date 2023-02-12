import { useDispatch } from "react-redux";
import { Row, Col, Button } from 'reactstrap';

import { removeFromFavorites } from "../../store/favoriteSlice";

export const FavoriteItem = (props) => {
  const { pictures, name, price, description, _id: id } = props;
  const dispatch = useDispatch();

  return (
    <Row style={{ paddingTop: 8, paddingBottom: 8 }}>
      <Col xs={2}>
        <img src={pictures} style={{ width: 80, border: '#ccc 1px solid', borderRadius: 3 }} />
      </Col>
      <Col xs={6}>
        <div>{name}</div>
        <div>{description}</div>
      </Col>
      <Col xs={2} style={{ fontWeight: 'bold' }}>{price} ₽</Col>
      <Col xs={2}>
        <Button variant="danger" onClick={() => dispatch(removeFromFavorites(id))}>X</Button>
      </Col>
    </Row>
  );
};
