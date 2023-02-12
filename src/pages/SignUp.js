import { useState } from "react";
import { Button, Alert } from "reactstrap";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';

import { register } from "../api";
import { buttonStyle } from "../constants/styles";
import { setRegistered } from "../store/tokenSlice";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  group: Yup.string()
    .required('Required'),
  password: Yup.string()
    .min(6)
    .required('Required'),
});

export const SignUp = () => {
  const dispatch = useDispatch();
  const [signUpError, setSignUpError] = useState();

  const signupMutation = useMutation(register, {
    onSuccess: (response) => {
      if (response.ok || (!response.ok && response.status === 409)) {
        response.json().then(() => {
          dispatch(setRegistered(true));
        });
      } else {
        setSignUpError(response.statusText);
      }
    },
    onError: (error) => {
      setSignUpError(error);
    },
  });

  return (
    <Formik
      initialValues={{
        email: '',
        group: '',
        password: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
         signupMutation.mutate(values);
       }}
     >
      <Form>
        {signUpError && (
          <Alert color="danger">
            {signUpError}
          </Alert>
        )}
        <Field label="Email address" name="email" component={ReactstrapInput} />
        <Field label="Group" name="group" component={ReactstrapInput} />
        <Field type="password" label="Password" name="password" component={ReactstrapInput} />

        <div style={{ marginTop: 24 }}>
          <Button style={buttonStyle} type="submit" color="primary">
            Register
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
