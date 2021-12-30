import React, { useState } from 'react';
import Link from 'next/link';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import Layout from 'components/common/Layout';
import {
  Container,
  Form,
  InputContainer,
  Input,
  Button,
  Message,
  Links,
} from 'components/auth/Common';

const SIGN_IN_USER = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
  }
`;

const SignIn = () => {
  const [values, setValues] = useState({
    username: ``,
    password: ``,
  });

  const onChange = (event: { target: { name: string; value: string } }) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const [signIn, { loading, error }] = useMutation(SIGN_IN_USER, {
    onCompleted: (data) => {
      console.log(data);
      window.localStorage.setItem(`token`, data.signIn);
    },
  });

  return (
    <Layout>
      <Container>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            signIn({
              variables: {
                ...values,
              },
            });
          }}
        >
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

          <Button type="submit">Sign In</Button>

          <Message>
            Dont have an account ?{` `}
            <Link href={`/auth/signup`} passHref>
              <Links>Sign up</Links>
            </Link>
          </Message>
        </Form>
      </Container>
    </Layout>
  );
};

export default SignIn;
