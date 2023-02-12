import { useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button, Alert, CardImg } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

import { getCurrentUser } from "../api";
import { setToken } from "../store/tokenSlice";
import { buttonStyle } from '../constants/styles';
 
export const User = () => {
  const token = useSelector((state) => state.tokenSlice.token);
  const [userError, setUserError] = useState();
  const dispatch = useDispatch();

  const userQuery = useQuery(["user"], async () => {
    const response = await getCurrentUser(token);

    if (!response.ok) {
      setUserError(response.statusText);
    } else {
      return response.json();
    }
  });

  return (
    <>
      {userError && (
          <Alert color="danger">
            {userError}
          </Alert>
        )}
      {!userError && (
        <Card style={{ width: "30rem" }}>
          <CardImg src={userQuery.data?.avatar} />
          <CardBody>
            <CardTitle>Name: {userQuery.data?.name}</CardTitle>
            <CardText>About: {userQuery.data?.about}</CardText>
            <CardText>e-mail: {userQuery.data?.email}</CardText>
          </CardBody>
          <div>
            <Button
              style={{ ...buttonStyle, margin: 16 }}
              onClick={() => {
                dispatch(setToken(''));
              }}
              size="sm"
              outline
            >
              Выход из аккаунта
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};
