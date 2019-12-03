import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Button, Form, FormGroup, Label, Input, Alert, UncontrolledCollapse, Spinner, Container, Row, Col
} from 'reactstrap';
// import ReactSelect from 'react-select';
import DefaultLayout from '../layouts/Default';

// Mutation types for taxonomy fields

const CreateTopic = gql`
  mutation createTopic($input: CreateTopicInput!) {
    createTopic(input: $input) {
      id
      name
    }
  }
`;

const CreateContext = gql`
  mutation createContext($input: CreateContextInput!) {
    createContext(input: $input) {
      id
      name
    }
  }
`;

const CreatePartOfSpeech = gql`
  mutation createPartOfSpeech($input: CreatePartOfSpeechInput!) {
    createPartOfSpeech(input: $input) {
      id
      name
    }
  }
`;

const CreateEtymology = gql`
  mutation createEtymology($input: CreateEtymologyInput!) {
    createEtymology(input: $input) {
      id
      name
    }
  }
`;

const CreateTone = gql`
  mutation createTone($input: CreateToneInput!) {
    createTone(input: $input) {
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

class TaxCreateForm extends React.Component {
  constructor(props) {
    super(props);
    const { taxName } = this.props;
    const selectedTaxObjArr = {
      contexts: {
        name: 'Contexts',
        mutationName: CreateContext,
        mutationReturnObj: 'createContext',
        queryName: AllContexts,
        queryReturnObj: 'allContexts',
      },
      etymologies: {
        name: 'Etymology',
        mutationName: CreateEtymology,
        mutationReturnObj: 'createEtymology',
        queryName: AllEtymologies,
        queryReturnObj: 'allEtymologies',
      },
      partsOfSpeech: {
        name: 'Parts of Speech',
        mutationName: CreatePartOfSpeech,
        mutationReturnObj: 'createPartOfSpeech',
        queryName: AllPartsOfSpeech,
        queryReturnObj: 'allPartsOfSpeech',
      },
      topics: {
        name: 'Topics',
        mutationName: CreateTopic,
        mutationReturnObj: 'createTopic',
        queryName: AllTopics,
        queryReturnObj: 'allTopics',
      },
      tones: {
        name: 'Tones',
        mutationName: CreateTone,
        mutationReturnObj: 'createTones',
        queryName: AllTones,
        queryReturnObj: 'allTones',
      },
    };
    this.state = {
      loading: false,
      error: null,
      selectedTax: selectedTaxObjArr[taxName],
      CreateTaxInput: {
        name: '',
      },
    };

    this.handleChangeName = this.handleChangeName.bind(this);
  }

  static async getInitialProps({ query }) {
    const { taxName } = query;
    return { taxName };
  }

  handleChangeName(event) {
    const { CreateTaxInput } = { ...this.state };
    const currentState = CreateTaxInput;
    const { value } = event.target;
    currentState.name = value;
    this.setState({ CreateTaxInput: currentState });
  }

  render() {
    const {
      selectedTax,
      CreateTaxInput,
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
              value={CreateTaxInput.name}
              onChange={this.handleChangeName}
              placeholder="Enter name"
            />
          </FormGroup>
          <Mutation
            mutation={selectedTax.mutationName}
            variables={{ input: CreateTaxInput }}
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
            <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
              View all terms
            </Button>
            <UncontrolledCollapse toggler="#toggler">
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
                      <ul>
                        {returnObjArr.map(item => <li>{item.name}</li>)}
                      </ul>
                      );
                  }
                }
              </Query>
            </UncontrolledCollapse>
          </div>
          </Col>
          </Row>
        </Container>
      </DefaultLayout>
    );
  }
}

export default TaxCreateForm;
