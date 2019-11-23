import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {
 Button, Form, FormGroup, Label, Input, FormText, Alert 
} from 'reactstrap';
import ReactSelect from 'react-select';
import DefaultLayout from '../layouts/Default';

const CreateWord = gql`
  mutation CreateWord($input: CreateWordInput!) {
    createWord(input: $input) {
      id
      name
      slug
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

export default class WordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      selectedPartsOfSpeech: null,
      CreateWordInput: {
        name: '',
        definition: '',
        partOfSpeechIds: [],
        etymologyIds: [],
        contextIds: [],
        toneIds: [],
        note: '',
      },
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDefinition = this.handleChangeDefinition.bind(this);
    this.handleChangepartOfSpeechIds = this.handleChangepartOfSpeechIds.bind(this);
    this.handleChangeEtymologyIds = this.handleChangeEtymologyIds.bind(this);
    this.handleChangeContextIds = this.handleChangeContextIds.bind(this);
    this.handleChangeToneIds = this.handleChangeToneIds.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
  }

  handleChangeName(event) {
    const { CreateWordInput } = { ...this.state };
    const currentState = CreateWordInput;
    const { value } = event.target;
    currentState.name = value;
    this.setState({ CreateWordInput: currentState });
  }

  handleChangeDefinition(event) {
    const { CreateWordInput } = { ...this.state };
    const currentState = CreateWordInput;
    const { value } = event.target;
    currentState.definition = value;
    this.setState({ CreateWordInput: currentState });
  }

  handleChangepartOfSpeechIds(selectedPartsOfSpeech) {
    const { CreateWordInput } = { ...this.state };
    const currentState = CreateWordInput;
    if (selectedPartsOfSpeech) {
      const idArray = selectedPartsOfSpeech.map(item => item.value);
      currentState.partOfSpeechIds = idArray;
    }
    if (selectedPartsOfSpeech === null) {
      currentState.partOfSpeechIds = [];
    }
    this.setState({ CreateWordInput: currentState });
    this.setState({ selectedPartsOfSpeech });
  }

  handleChangeEtymologyIds(event) {
    const { CreateWordInput } = { ...this.state };
    const currentState = CreateWordInput;
    const options = event.target.options;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    currentState.etymologyIds = value;
    this.setState({ CreateWordInput: currentState });
  }

  handleChangeContextIds(event) {
    const { CreateWordInput } = { ...this.state };
    const currentState = CreateWordInput;
    const options = event.target.options;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    currentState.contextIds = value;
    this.setState({ CreateWordInput: currentState });
  }

  handleChangeToneIds(event) {
    const { CreateWordInput } = { ...this.state };
    const currentState = CreateWordInput;
    const options = event.target.options;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);

      }
    }
    currentState.toneIds = value;
    this.setState({ CreateWordInput: currentState });
  }

  handleChangeNote(event) {
    const { CreateWordInput } = { ...this.state };
    const currentState = CreateWordInput;
    const { value } = event.target;
    currentState.note = value;
    this.setState({ CreateWordInput: currentState });
  }

  render() {
    const {
      selectedPartsOfSpeech,
      CreateWordInput,
    } = this.state;
    return (
      <DefaultLayout>
        <Head>
          <title>Create Word</title>
        </Head>
        <h1>Add a Word</h1>
        <Form onSubmit={e => e.preventDefault()}>
          <Label for="name">Word</Label>
          <Input
            type="text"
            name="name"
            value={CreateWordInput.name}
            onChange={this.handleChangeName}
            placeholder="Enter word"
          />
          <Label for="definition">Definition</Label>
          <Input
            type="textarea"
            name="definition"
            rows="5"
            value={CreateWordInput.definition}
            onChange={this.handleChangeDefinition}
            placeholder="Enter custom definition"
          />
          <Label for="partOfSpeechIds">Part of Speech</Label>
          {/* <Input onChange={this.handleChangepartOfSpeechIds} type="select" name="partOfSpeechIds" id="partOfSpeechIds" multiple> */}
            <Query query={AllPartsOfSpeech}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <Alert color="danger">{error.message}</Alert>;
                return (
                  // console.log();
                  <ReactSelect
                    isMulti
                    value={selectedPartsOfSpeech}
                    onChange={this.handleChangepartOfSpeechIds}
                    options={data.allPartsOfSpeech.map(item => ({ value: item.id, label: item.name }))}
                  />
                );
              }}
            </Query>
          {/* </Input> */}
          <Label for="etymologyIds">Etymology</Label>
          <Input onChange={this.handleChangeEtymologyIds} type="select" name="etymologyIds" id="etymologyIds" multiple>
            <Query query={AllEtymologies}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <Alert color="danger">{error.message}</Alert>;
                return data.allEtymologies.map(etymology => (
                  <option value={etymology.id}>{etymology.name}</option>
                ));
              }}
            </Query>
          </Input>
          <Label for="contextIds">Context</Label>
          <Input onChange={this.handleChangeContextIds} type="select" name="contextIds" id="contextIds" multiple>
            <Query query={AllContexts}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <Alert color="danger">{error.message}</Alert>;
                return data.allContexts.map(context => (
                  <option value={context.id}>{context.name}</option>
                ));
              }}
            </Query>
          </Input>
          <Label for="toneIds">Tone</Label>
          <Input onChange={this.handleChangeToneIds} type="select" name="toneIds" id="toneIds" multiple>
            <Query query={AllTones}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <Alert color="danger">{error.message}</Alert>;
                return data.allTones.map(tone => (
                  <option value={tone.id}>{tone.name}</option>
                ));
              }}
            </Query>
          </Input>
          <Label for="note">Notes</Label>
          <Input
            type="textarea"
            name="note"
            rows="5"
            value={CreateWordInput.note}
            onChange={this.handleChangeNote}
            placeholder="Note to self"
          />
          <Mutation
            mutation={CreateWord}
            variables={{ input: CreateWordInput }}
          >
            {(createWordMutation, { loading, error, data }) => {
              if (loading) {
                return <Button color="secondary">Loading...</Button>;
              }
              if (error) {
                return (
                  <div>
                    <Button color="primary" onClick={createWordMutation}>Submit</Button>
                    <Alert color="danger">
                      Error: {error.message}
                    </Alert>
                  </div>
                );
              }
              if (data) {
                const { createWord } = data;
                return (
                  <Alert color="success">
                    Success! View <a href={`/word/${createWord.slug}`}>{createWord.name}</a>  
                  </Alert>
                );
              }
              return (
                <Button color="primary" onClick={createWordMutation}>Submit</Button>
              );
            }
            }
          </Mutation>
        </Form>
      </DefaultLayout>
    );
  }
}
