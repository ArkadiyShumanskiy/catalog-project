import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Input } from 'reactstrap';

import { removeItem, setItemCount, checkItem, uncheckItem } from "../../store/cartSlice";

export const CartItem = (props) => {
  const { pictures, name, price, stock, description, _id: id } = props;
  const dispatch = useDispatch();
  const count = useSelector((state) => state.cartSlice.items.find((item) => item.id === id)?.count);
  const isItemChecked = useSelector((state) => state.cartSlice.chosenItemsIds?.some((item) => item === id));

  return (
    <Row style={{ paddingTop: 8, paddingBottom: 8 }}>
      <Col xs={1}>
        <Input type="checkbox" checked={isItemChecked} onChange={() => isItemChecked ? dispatch(uncheckItem(id)) : dispatch(checkItem(id))} />
      </Col>
      <Col xs={2}>
        <img src={pictures} style={{ width: 50, border: '#ccc 1px solid', borderRadius: 3 }} />
      </Col>
      <Col xs={4}>
        <div>{name}</div>
        <div>{description}</div>
      </Col>
      <Col xs={1}>
        <Input
          type="number"
          value={count ?? 0}
          min={1}
          max={stock ?? 1}
          onChange={(event) => dispatch(setItemCount({ id, count: event.target.value }))}
        />
      </Col>
      <Col xs={2} style={{ fontWeight: 'bold' }}>{price} ₽</Col>
      <Col xs={2}>
        <Button variant="danger" onClick={() => dispatch(removeItem(id))}>X</Button>
      </Col>
    </Row>
  );
};
