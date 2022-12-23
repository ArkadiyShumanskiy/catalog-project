import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./Header.module.css";
import logo from "../assets/dogFood.png";

export const Header = (props) => {
  const { onOpenUserPageClick, isAuthorized } = props;

  const operUserPage = () => {
    onOpenUserPageClick("user");
  };

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
          <Button
            className={styles.userButton}
            variant="light"
            onClick={operUserPage}
          >
            User Info
          </Button>
        )}
      </Col>
    </Row>
  );
};
