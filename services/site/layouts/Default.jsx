import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import NavBar from '../components/NavBar';

const DefaultLayout = ({ children }) => (
  <>
    <NavBar />
    <Container fluid>
      <Row>
        <Col className="my-3">
          {children}
        </Col>
      </Row>
    </Container>
  </>
);

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
