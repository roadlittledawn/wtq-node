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

const UpdateTopic = gql`
  mutation updateTopic($input: UpdateTopicInput!) {
    updateTopic(input: $input) {
      id
      name
    }
  }
`;

// Query types for specific tax term

const TopicById = gql`
  query topic($input: TopicInput!) {
    topic(input: $input) {
      id
      name
    }
  }
`;

// Query types for taxonomy fields

const AllTopics = gql`
  query allTopics {
    allTopics {
      id
      name
    }
  }
`;

class TopicEditForm extends React.Component {
  constructor(props) {
    super(props);
    const { id } = this.props;
    const { topic } = this.props.data;
    this.state = {
      loading: false,
      error: null,
      UpdateTaxInput: {
        name: topic.name,
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
    const { topic } = this.props.data;
    return (
      <DefaultLayout>
        <Head>
          <title>Edit term</title>
        </Head>
        <Container fluid="true">
          <Row>
            <Col>
              <h1>Edit {topic.name} term</h1>
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
            mutation={UpdateTopic}
            variables={{ input: { id: topic.id, payload: UpdateTaxInput } }}
            refetchQueries={ [{ query: AllTopics }] }
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
            <Query query={AllTopics}>
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
                  const { allTopics } = data;
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
                        allTopics.sort((a, b) => {
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

const TopicEditFormWithData = graphql(TopicById, {
  options: id => ({
    variables: {
      input: id,
    },
  }),
})(TopicEditForm);

TopicEditFormWithData.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};

TopicEditFormWithData.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TopicEditFormWithData;
