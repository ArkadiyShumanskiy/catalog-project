import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useMutation } from "react-query";

import { register } from "../api";

export const SignUp = (props) => {
  const { setIsRegistered } = props;
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [password, setPassword] = useState("");

  const signupMutation = useMutation(register, {
    onSuccess: () => {
      localStorage.setItem("registered", "true");
      setIsRegistered(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onClick = () => {
    const form = {
      email: email,
      group: group,
      password: password,
    };
    signupMutation.mutate(form);
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
        <Form.Label>Group</Form.Label>
        <Form.Control
          value={group}
          onChange={(event) => {
            setGroup(event.target.value);
          }}
          type="text"
          placeholder="Enter group"
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
        Register
      </Button>
    </Form>
  );
};
