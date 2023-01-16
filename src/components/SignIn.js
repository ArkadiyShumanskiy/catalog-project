import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useMutation } from "react-query";

import { authorize } from "../api";

export const SignIn = (props) => {
  const { setIsAuthorized } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signinMutation = useMutation(authorize, {
    onSuccess: (response) => {
      if (response.ok) {
        response.json().then((responseJSON) => {
          localStorage.setItem("authorized", "true");
          localStorage.setItem("token", responseJSON.token);
          setIsAuthorized(true);
        });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onClick = () => {
    const form = {
      email: email,
      password: password,
    };
    signinMutation.mutate(form);
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
