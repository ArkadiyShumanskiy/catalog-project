import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./Header.module.css";
import logo from "../assets/dogFood.png";

export const Header = (props) => {
  const token = useSelector((state) => state.tokenSlice.token);
  const itemsCount = useSelector((state) => state.cartSlice.items.length);
  const isAuthorized = Boolean(token);
  const navigate = useNavigate();

  return (
    <Row className={styles.header}>
      <Col className={styles.logoWrapper}>
        <div className={styles.logoImage}>
          <img className={styles.logo} src={logo}></img>
        </div>
        <div className={styles.logoText}>DogFood</div>
      </Col>
      <Col className={styles.column}>
        <Form.Control type="text" className={styles.search} />
      </Col>
      <Col className={styles.column}>
        {isAuthorized && (
          <button
            className={styles.button}
            onClick={() => navigate("/user")}
          >
            User Info
          </button>
        )}
      </Col>
      <Col className={styles.column}>
        <button
          className={styles.button}
          onClick={() => navigate("/cart")}
        >
          Cart {itemsCount}
        </button>
      </Col>
    </Row>
  );
};
