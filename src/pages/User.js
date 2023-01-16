import Card from "react-bootstrap/Card";
import { useQuery } from "react-query";

import { getCurrentUser } from "../api";

export const User = () => {
  const userQuery = useQuery("user", async () => {
    const response = await getCurrentUser();

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
