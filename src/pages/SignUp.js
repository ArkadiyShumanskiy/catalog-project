import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { register } from "../api";
import { setRegistered } from "../store/tokenSlice";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const signupMutation = useMutation(register, {
    onSuccess: (response) => {
      if (response.ok || (!response.ok && response.status === 409)) {
        response.json().then(() => {
          dispatch(setRegistered(true));
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
