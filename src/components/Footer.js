import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./Footer.module.css";
import logo from "../assets/dogFood.png";

export const Footer = () => {
  return (
    <Row className={styles.footer}>
      <Col className={styles.logoWrapper}>
        <div className={styles.logoImage}>
          <img className={styles.logo} src={logo}></img>
        </div>
        <div className={styles.logoText}>DogFood</div>
      </Col>
      <Col className={styles.column}></Col>
      <Col className={styles.column}></Col>
    </Row>
  );
};
