import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Row, Col, Input, CardImg } from "reactstrap";

import { buttonStyle } from '../constants/styles';

import styles from "./Header.module.css";
import logo from "../assets/dogFood.png";

const headerButtonStyle = { ...buttonStyle, marginTop: 16, marginBottom: 16, marginLeft: 8 };
const searchStyle = { margin: 16, borderRadius: 20 }

export const Header = (props) => {
  const token = useSelector((state) => state.tokenSlice.token);
  const itemsCount = useSelector((state) => state.cartSlice.items.length);
  const favoritesCount = useSelector((state) => state.favoriteSlice.items.length);
  const isAuthorized = Boolean(token);
  const navigate = useNavigate();

  return (
    <Row className={styles.header}>
      <Col className={styles.logoWrapper}>
        <div className={styles.logoImage}>
          <Link to="/">
            <CardImg className={styles.logo} src={logo} />
          </Link>
        </div>
        <Link to="/" className={styles.logoText}>DogFood</Link>
      </Col>
      <Col className={styles.column}>
        <Input style={searchStyle} />
      </Col>
      <Col className={styles.userColumn}>
        {isAuthorized && (
          <Button
            style={headerButtonStyle}
            onClick={() => navigate("/user")}
            size="sm"
            outline
          >
            Информация о юзере
          </Button>
        )}
        {favoritesCount > 0 && (
          <Button
            style={headerButtonStyle}
            onClick={() => navigate("/favorites")}
            size="sm"
            outline
          >
            Избранное {favoritesCount}
          </Button>
        )} 
      </Col>
      <Col className={styles.column}>
        <Button
          style={headerButtonStyle}
          onClick={() => navigate("/cart")}
          size="sm"
          outline
        >
          Корзина {itemsCount}
        </Button>
      </Col>
    </Row>
  );
};
