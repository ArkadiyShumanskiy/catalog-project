import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";

import { getCurrentUser } from "../api";

export const User = () => {
  const [user, setUser] = useState({});
  const { name, about, avatar, email } = user;

  useEffect(() => {
    getCurrentUser()
      .then((response) => {
        if (response.ok) {
          response.json().then((responseJson) => {
            setUser(responseJson);
          });
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card style={{ width: "30rem" }}>
      <Card.Img variant="top" src={avatar} />
      <Card.Body>
        <Card.Title>Name: {name}</Card.Title>
        <Card.Text>About: {about}</Card.Text>
        <Card.Text>e-mail: {email}</Card.Text>
      </Card.Body>
    </Card>
  );
};
