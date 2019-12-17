import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import DefaultLayout from '../layouts/Default';
import Login from '../components/Login';

const LoginPage = () => (
  <>
  <DefaultLayout>
    <Login />
  </DefaultLayout>
  </>
);

export default LoginPage;
