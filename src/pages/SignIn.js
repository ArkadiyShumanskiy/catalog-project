import { useState } from "react";
import { Button, Alert } from "reactstrap";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';

import { authorize } from "../api";
import { setToken } from "../store/tokenSlice";
import { buttonStyle } from "../constants/styles";

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6)
    .required('Required'),
});

export const SignIn = () => {
  const dispatch = useDispatch();
  const [signInError, setSignInError] = useState();

  const signinMutation = useMutation(authorize, {
    onSuccess: (response) => {
      if (response.ok) {
        response.json().then((responseJSON) => {
          dispatch(setToken(responseJSON.token));
        });
      } else {
        setSignInError(response.statusText);
      }
    },
    onError: (error) => {
      setSignInError(error);
    },
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
       }}
       validationSchema={SigninSchema}
       onSubmit={async values => {
        await signinMutation.mutateAsync(values);
       }}
     >
      <Form>
        {signInError && (
          <Alert color="danger">
            {signInError}
          </Alert>
        )}
        <Field label="Email address" name="email" component={ReactstrapInput} />
        <Field type="password" label="Password" name="password" component={ReactstrapInput} />

        <div style={{ marginTop: 24 }}>
          <Button style={buttonStyle} type="submit" color="primary">
            Authorize
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
