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

const UpdateContext = gql`
  mutation updateContext($input: UpdateContextInput!) {
    updateContext(input: $input) {
      id
      name
    }
  }
`;

// Query types for specific tax term

const ContextById = gql`
  query context($input: ContextInput!) {
    context(input: $input) {
      id
      name
    }
  }
`;

// Query types for taxonomy fields

const AllContexts = gql`
  query allContexts {
    allContexts {
      id
      name
    }
  }
`;

class ContextEditForm extends React.Component {
  constructor(props) {
    super(props);
    const { id } = this.props;
    const { context } = this.props.data;
    this.state = {
      loading: false,
      error: null,
      UpdateTaxInput: {
        name: context.name,
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
    const { context } = this.props.data;
    return (
      <DefaultLayout>
        <Head>
          <title>Edit term</title>
        </Head>
        <Container fluid="true">
          <Row>
            <Col>
              <h1>Edit {context.name} term</h1>
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
            mutation={UpdateContext}
            variables={{ input: { id: context.id, payload: UpdateTaxInput } }}
            refetchQueries={ [{ query: AllContexts }] }
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
            <Query query={AllContexts}>
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
                  const { allContexts } = data;
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
                        allContexts.sort((a, b) => {
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

const ContextEditFormWithData = graphql(ContextById, {
  options: id => ({
    variables: {
      input: id,
    },
  }),
})(ContextEditForm);

ContextEditFormWithData.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};

ContextEditFormWithData.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ContextEditFormWithData;
