import Card from "react-bootstrap/Card";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { getCurrentUser } from "../api";

export const User = () => {
  const token = useSelector((state) => state.tokenSlice.token);
  const userQuery = useQuery(["user"], async () => {
    const response = await getCurrentUser(token);

    if (!response.ok) {
      console.log(response);
    }

    return response.json();
  });

  return (
    <Card style={{ width: "30rem" }}>
      <Card.Img variant="top" src={userQuery.data?.avatar} />
      <Card.Body>
        <Card.Title>Name: {userQuery.data?.name}</Card.Title>
        <Card.Text>About: {userQuery.data?.about}</Card.Text>
        <Card.Text>e-mail: {userQuery.data?.email}</Card.Text>
      </Card.Body>
    </Card>
  );
};
