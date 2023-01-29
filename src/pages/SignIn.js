import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authorize } from "../api";
import { setToken } from "../store/tokenSlice";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signinMutation = useMutation(authorize, {
    onSuccess: (response) => {
      if (response.ok) {
        response.json().then((responseJSON) => {
          dispatch(setToken(responseJSON.token));
        });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onClick = async () => {
    const form = {
      email: email,
      password: password,
    };
    await signinMutation.mutateAsync(form);
    navigate("catalog");
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
          placeholder="Password"
        />
      </Form.Group>

      <Button onClick={onClick} variant="primary" type="button">
        Authorize
      </Button>
    </Form>
  );
};
