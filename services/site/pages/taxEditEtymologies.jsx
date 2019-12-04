import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Query, Mutation, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Button, Form, FormGroup, Label, Input, Alert, Spinner, Container, Row, Col, Table
} from 'reactstrap';
// import ReactSelect from 'react-select';
import DefaultLayout from '../layouts/Default';

// Mutation types for taxonomy fields

const UpdateEtymology = gql`
  mutation updateEtymology($input: UpdateEtymologyInput!) {
    updateEtymology(input: $input) {
      id
      name
    }
  }
`;

// Query types for specific tax term

const EtymologyById = gql`
  query etymology($input: EtymologyInput!) {
    etymology(input: $input) {
      id
      name
    }
  }
`;

// Query types for taxonomy fields

const AllEtymologies = gql`
  query allEtymologies {
    allEtymologies {
      id
      name
    }
  }
`;

class EtymologyEditForm extends React.Component {
  constructor(props) {
    super(props);
    const { id } = this.props;
    const { etymology } = this.props.data;
    this.state = {
      loading: false,
      error: null,
      UpdateTaxInput: {
        name: etymology.name,
      },
    };
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  handleChangeName(event) {
    const { UpdateTaxInput } = { ...this.state };
    const currentState = UpdateTaxInput;
    const { value } = event.target;
    currentState.name = value;
    this.setState({ UpdateTaxInput: currentState });
  }

  render() {
    const {
      UpdateTaxInput,
    } = this.state;
    const { etymology } = this.props.data;
    return (
      <DefaultLayout>
        <Head>
          <title>Edit term</title>
        </Head>
        <Container fluid="true">
          <Row>
            <Col>
              <h1>Edit {etymology.name} term</h1>
            </Col>
          </Row>
          <Row>
            <Col md="6">
          <FormGroup>
            <Label for="name">Term name</Label>
            <Input
              type="text"
              name="name"
              value={UpdateTaxInput.name}
              onChange={this.handleChangeName}
              placeholder="Enter name"
            />
          </FormGroup>
          <Mutation
            mutation={UpdateEtymology}
            variables={{ input: { id: etymology.id, payload: UpdateTaxInput } }}
            refetchQueries={ [{ query: AllEtymologies }] }
          >
            {(createTaxMutation, { loading, error, data }) => {
              if (loading) {
                return <Button color="secondary">Loading...</Button>;
              }
              if (error) {
                return (
                  <div>
                    <Button color="primary" onClick={createTaxMutation}>Submit</Button>
                    <Alert color="danger">
                      Error: {error.message}
                    </Alert>
                  </div>
                );
              }
              if (data) {
                return (
                  <Alert color="success">
                    Success! 
                  </Alert>
                );
              }
              return (
                <Button color="primary" onClick={createTaxMutation}>Submit</Button>
              );
            }
            }
          </Mutation>
          </Col>
          <Col md="6">
          <div>
            <Query query={AllEtymologies}>
              {
                ({ loading, error, data }) => {
                  if (loading) {
                    return <Spinner color="primary" />;
                  }
                  if (error) {
                    return (
                      <div>
                        <Alert color="danger">
                          Error: {error.message}
                        </Alert>
                      </div>
                    );
                  }
                  const { allEtymologies } = data;
                  return (
                    <Table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Term name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                        allEtymologies.sort((a, b) => {
                          if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1;
                          }
                          if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1;
                          }
                          return 0;
                        }).map(
                          (item, index) => <tr><td>{index+1}</td><td>{item.name}</td></tr>
                        )
                        }
                      </tbody>
                    </Table>
                  );
                }
              }
            </Query>
          </div>
          </Col>
          </Row>
        </Container>
      </DefaultLayout>
    );
  }
}

const EtymologyEditFormWithData = graphql(EtymologyById, {
  options: id => ({
    variables: {
      input: id,
    },
  }),
})(EtymologyEditForm);

EtymologyEditFormWithData.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};

EtymologyEditFormWithData.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EtymologyEditFormWithData;
