import React, { useState } from 'react';
import Link from 'next/link';
import Layout from 'components/common/Layout';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import {
  Container,
  Form,
  InputContainer,
  Input,
  Button,
  Message,
  Links,
} from 'components/auth/Common';

const SIGN_UP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = () => {
  const [values, setValues] = useState({
    fullName: ``,
    username: ``,
    email: ``,
    password: ``,
  });

  const [signUp, { loading, error }] = useMutation(SIGN_UP_USER, {
    onCompleted: (data) => {
      // console.log the JSON Web Token when the mutation is complete
      console.log(data.signUp);
      // store the JWT in localStorage
      window.localStorage.setItem(`token`, data.signUp);
    },
  });

  const onChange = (event: { target: { name: string; value: string } }) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Layout>
      <Container>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            signUp({
              variables: {
                ...values,
              },
            });
          }}
        >
          <InputContainer>
            <p>Full Name</p>
            <Input
              type="text"
              placeholder="Full Name"
              name="fullName"
              required
              value={values.fullName}
              onChange={onChange}
            />
          </InputContainer>

          <InputContainer>
            <p>Username</p>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              required
              value={values.username}
              onChange={onChange}
            />
          </InputContainer>

          <InputContainer>
            <p>Email</p>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={onChange}
              value={values.email}
            />
          </InputContainer>

          <InputContainer>
            <p>Password</p>
            <Input
              required
              type="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
              value={values.password}
            />
          </InputContainer>

          <Button type="submit">Sign Up</Button>

          <Message>
            Have an Account ?{` `}
            <Link href={`/auth/signin`} passHref>
              <Links>Sign In</Links>
            </Link>
          </Message>
        </Form>
      </Container>
    </Layout>
  );
};

export default SignUp;
