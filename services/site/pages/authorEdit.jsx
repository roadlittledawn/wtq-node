import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Query, Mutation, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Button, Form, FormGroup, Label, Input, Alert, UncontrolledCollapse, Spinner, Container, Row, Col, Table
} from 'reactstrap';
// import ReactSelect from 'react-select';
import DefaultLayout from '../layouts/Default';

const UpdateAuthor = gql`
  mutation updateAuthor($input: UpdateAuthorInput!) {
    updateAuthor(input: $input) {
      id
      name
    }
  }
`;

const AuthorById = gql`
  query author($input: AuthorInput!) {
    author(input: $input) {
      id
      name
    }
  }
`;

const AllAuthors = gql`
  query allAuthors {
    allAuthors {
      id
      name
    }
  }
`;

class AuthorUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    const { author } = this.props.data;
    this.state = {
      loading: false,
      error: null,
      UpdateAuthorInput: {
        name: author.name,
      },
    };

    this.handleChangeName = this.handleChangeName.bind(this);
  }

  handleChangeName(event) {
    const { UpdateAuthorInput } = { ...this.state };
    const currentState = UpdateAuthorInput;
    const { value } = event.target;
    currentState.name = value;
    this.setState({ UpdateAuthorInput: currentState });
  }

  render() {
    const {
      UpdateAuthorInput,
    } = this.state;
    const { author } = this.props.data;
    return (
      <DefaultLayout>
        <Head>
          <title>Add Author</title>
        </Head>
        <Container fluid="true">
          <Row>
            <Col>
              <h1>Add author</h1>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label for="name">Author name</Label>
                <Input
                  type="text"
                  name="name"
                  value={UpdateAuthorInput.name}
                  onChange={this.handleChangeName}
                  placeholder="Enter name"
                />
              </FormGroup>
              <Mutation
                mutation={UpdateAuthor}
                variables={{ input: { id: author.id, payload: UpdateAuthorInput } }}
                refetchQueries={[{ query: AllAuthors }]}
              >
                {(updateAuthorMutation, { loading, error, data }) => {
                  if (loading) {
                    return <Button color="secondary">Loading...</Button>;
                  }
                  if (error) {
                    return (
                      <div>
                        <Button color="primary" onClick={updateAuthorMutation}>Submit</Button>
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
                    <Button color="primary" onClick={updateAuthorMutation}>Submit</Button>
                  );
                }
                }
              </Mutation>
            </Col>
            <Col md="6">
              <div>
                <Query query={AllAuthors}>
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
                      const { allAuthors } = data;
                      return (
                        <Table>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Author name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              allAuthors.sort((a, b) => {
                                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                  return 1;
                                }
                                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                                  return -1;
                                }
                                return 0;
                              }).map(
                                (item, index) => <tr><td>{index + 1}</td><td>{item.name}</td></tr>
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

const AuthorUpdateFormWithData = graphql(AuthorById, {
  options: id => ({
    variables: {
      input: id,
    },
  }),
})(AuthorUpdateForm);

AuthorUpdateFormWithData.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};

AuthorUpdateFormWithData.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AuthorUpdateFormWithData;
