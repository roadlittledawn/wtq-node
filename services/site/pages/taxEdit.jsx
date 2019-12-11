import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Query, Mutation } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
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

const UpdateContext = gql`
  mutation updateContext($input: UpdateContextInput!) {
    updateContext(input: $input) {
      id
      name
    }
  }
`;

const UpdatePartOfSpeech = gql`
  mutation updatePartOfSpeech($input: UpdatePartOfSpeechInput!) {
    updatePartOfSpeech(input: $input) {
      id
      name
    }
  }
`;

const UpdateEtymology = gql`
  mutation updateEtymology($input: UpdateEtymologyInput!) {
    updateEtymology(input: $input) {
      id
      name
    }
  }
`;

const UpdateTone = gql`
  mutation updateTone($input: UpdateToneInput!) {
    updateTone(input: $input) {
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

const AllTopics = gql`
  query allTopics {
    allTopics {
      id
      name
    }
  }
`;

const AllPartsOfSpeech = gql`
  query allPartsOfSpeech {
    allPartsOfSpeech {
      id
      name
    }
  }
`;

const AllEtymologies = gql`
  query allEtymologies {
    allEtymologies {
      id
      name
    }
  }
`;

const AllContexts = gql`
  query allContexts {
    allContexts {
      id
      name
    }
  }
`;

const AllTones = gql`
  query allTones {
    allTones {
      id
      name
    }
  }
`;

class TaxEditForm extends React.Component {
  constructor(props) {
    super(props);
    const { taxName, tid } = this.props;
    const selectedTaxObjArr = {
      contexts: {
        name: 'Contexts',
        mutationName: UpdateContext,
        mutationReturnObj: 'updateContext',
        queryName: AllContexts,
        queryReturnObj: 'allContexts',
      },
      etymologies: {
        name: 'Etymology',
        mutationName: UpdateEtymology,
        mutationReturnObj: 'updateEtymology',
        queryName: AllEtymologies,
        queryReturnObj: 'allEtymologies',
      },
      partsOfSpeech: {
        name: 'Parts of Speech',
        mutationName: UpdatePartOfSpeech,
        mutationReturnObj: 'updatePartOfSpeech',
        queryName: AllPartsOfSpeech,
        queryReturnObj: 'allPartsOfSpeech',
      },
      topics: {
        name: 'Topics',
        mutationName: UpdateTopic,
        mutationReturnObj: 'updateTopic',
        queryName: AllTopics,
        queryReturnObj: 'allTopics',
      },
      tones: {
        name: 'Tones',
        mutationName: UpdateTone,
        mutationReturnObj: 'updateTones',
        queryName: AllTones,
        queryReturnObj: 'allTones',
      },
    };
    this.state = {
      loading: false,
      error: null,
      selectedTax: selectedTaxObjArr[taxName],
      UpdateTaxInput: {
        name: '',
      },
    };
    this.handleChangeName = this.handleChangeName.bind(this);

    

  }

  // componentDidMount() {
  //   const { taxName, tid } = this.props;
  //   if (taxName === 'contexts') {
  //     const { loading, error, data } = useQuery(ContextById, {
  //       variables: { input: { tid } },
  //     });
  //     if (loading) return 'Loading...';
  //     if (error) return `Error! ${error.message}`;
  //     this.setState({ UpdateTaxInput: { name: data.context.name } });
  //   }
  // }

  static async getInitialProps({ query }) {
    const { taxName } = query;
    return { taxName };
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
      selectedTax,
      UpdateTaxInput,
    } = this.state;
    return (
      <DefaultLayout>
        <Head>
          <title>Create Tax Term</title>
        </Head>
        <Container fluid="true">
          <Row>
            <Col>
              <h1>Add a term to {selectedTax.name} taxonomy</h1>
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
            mutation={selectedTax.mutationName}
            variables={{ input: UpdateTaxInput }}
            refetchQueries={ [{ query: selectedTax.queryName }] }
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
            <Query query={selectedTax.queryName}>
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
                  let returnObjName = selectedTax.queryReturnObj;
                  let returnObjArr = data[returnObjName];
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
                        returnObjArr.sort((a, b) => {
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

export default TaxEditForm;
