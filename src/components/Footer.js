import { Row, Col, CardImg } from "reactstrap";

import styles from "./Footer.module.css";
import logo from "../assets/dogFood.png";

export const Footer = () => {
  return (
    <Row className={styles.footer}>
      <Col className={styles.logoWrapper}>
        <div className={styles.logoImage}>
          <CardImg className={styles.logo} src={logo} />
        </div>
        <div className={styles.logoText}>DogFood</div>
      </Col>
      <Col className={styles.column}></Col>
      <Col className={styles.column}></Col>
      <Col className={styles.column}></Col>
    </Row>
  );
};
