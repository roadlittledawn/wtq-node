import React from 'react';
import PropTypes from 'prop-types';
// import Head from 'next/head';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import ReactSelect from 'react-select';

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

// const async SelectPartsOfSpeech () => {

// }

export default class WordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formFieldValues: {
        name: '',
        definition: '',
        partsOfSpeech: '',
        etymologies: '',
        contexts: '',
        tones: '',
        note: '',
      },
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDefinition = this.handleChangeDefinition.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    const { formFieldValues } = { ...this.state };
    const currentState = formFieldValues;
    const { value } = event.target;
    currentState.name = value;
    this.setState({ formFieldValues: currentState });
  }

  handleChangeDefinition(event) {
    const { formFieldValues } = { ...this.state };
    const currentState = formFieldValues;
    const { value } = event.target;
    currentState.definition = value;
    this.setState({ formFieldValues: currentState });
  }

  handleChangeNote(event) {
    const { formFieldValues } = { ...this.state };
    const currentState = formFieldValues;
    const { value } = event.target;
    currentState.note = value;
    this.setState({ formFieldValues: currentState });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.formFieldValues.name);
    event.preventDefault();
  }

  render() {
    const {
      formFieldValues,
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label for="name">Word</Label>
        <Input
          type="text"
          name="name"
          value={formFieldValues.name}
          onChange={this.handleChangeName}
          placeholder="Enter word"
        />
        <Label for="definition">Definition</Label>
        <Input
          type="textarea"
          name="definition"
          rows="5"
          value={formFieldValues.definition}
          onChange={this.handleChangeDefinition}
          placeholder="Enter custom definition"
        />
        <Label for="partsOfSpeech">Part of Speech</Label>
        <Input type="select" name="partsOfSpeech" id="partsOfSpeech" multiple>
          <Query query={AllPartsOfSpeech}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <Alert color="danger">{error.message}</Alert>;
              return data.allPartsOfSpeech.map(part => (
                <option value={part.id}>{part.name}</option>
              ));
            }}
          </Query>
        </Input>
        <Label for="etymologies">Etymology</Label>
        <Input type="select" name="etymologies" id="etymologies" multiple>
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
        <Label for="contexts">Context</Label>
        <Input type="select" name="contexts" id="contexts" multiple>
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
        <Label for="tones">Tone</Label>
        <Input type="select" name="tones" id="tones" multiple>
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
          value={formFieldValues.note}
          onChange={this.handleChangeNote}
          placeholder="Note for self"
        />
        <Button>Submit</Button>
      </Form>
    );
  }
}
