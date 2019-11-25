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

const CreateQuote = gql`
  mutation CreateQuote($input: CreateQuoteInput!) {
    createQuote(input: $input) {
      id
      name
      slug
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

const AllTopics = gql`
  query allTopics {
    allTopics {
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

export default class QuoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      selectedAuthor: null,
      selectedTones: null,
      selectedTopics: null,
      CreateQuoteInput: {
        name: '',
        body: '',
        authorId: '',
        topicIds: [],
        toneIds: [],
        note: '',
        source: '',
      },
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeBody = this.handleChangeBody.bind(this);
    this.handleChangeAuthorId = this.handleChangeAuthorId.bind(this);
    this.handleChangeTopicIds = this.handleChangeTopicIds.bind(this);
    this.handleChangeToneIds = this.handleChangeToneIds.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleChangeSource = this.handleChangeSource.bind(this);
  }

  handleChangeName(event) {
    const { CreateQuoteInput } = { ...this.state };
    const currentState = CreateQuoteInput;
    const { value } = event.target;
    currentState.name = value;
    this.setState({ CreateQuoteInput: currentState });
  }

  handleChangeBody(event) {
    const { CreateQuoteInput } = { ...this.state };
    const currentState = CreateQuoteInput;
    const { value } = event.target;
    currentState.body = value;
    this.setState({ CreateQuoteInput: currentState });
  }

  handleChangeAuthorId(selectedAuthor) {
    const { CreateQuoteInput } = { ...this.state };
    const currentState = CreateQuoteInput;
    if (selectedAuthor) {
      // const idArray = selectedAuthor.map(item => item.value);
      currentState.authorId = selectedAuthor.value;
    }
    if (selectedAuthor === null) {
      currentState.authorId = [];
    }
    this.setState({ CreateQuoteInput: currentState });
    this.setState({ selectedAuthor });
  }

  handleChangeTopicIds(selectedTopics) {
    const { CreateQuoteInput } = { ...this.state };
    const currentState = CreateQuoteInput;
    if (selectedTopics) {
      const idArray = selectedTopics.map(item => item.value);
      currentState.topicIds = idArray;
    }
    if (selectedTopics === null) {
      currentState.topicIds = [];
    }
    this.setState({ CreateQuoteInput: currentState });
    this.setState({ selectedTopics });
  }

  handleChangeToneIds(selectedTones) {
    const { CreateQuoteInput } = { ...this.state };
    const currentState = CreateQuoteInput;
    if (selectedTones) {
      const idArray = selectedTones.map(item => item.value);
      currentState.toneIds = idArray;
    }
    if (selectedTones === null) {
      currentState.toneIds = [];
    }
    this.setState({ CreateQuoteInput: currentState });
    this.setState({ selectedTones });
  }

  handleChangeNote(event) {
    const { CreateQuoteInput } = { ...this.state };
    const currentState = CreateQuoteInput;
    const { value } = event.target;
    currentState.note = value;
    this.setState({ CreateQuoteInput: currentState });
  }

  handleChangeSource(event) {
    const { CreateQuoteInput } = { ...this.state };
    const currentState = CreateQuoteInput;
    const { value } = event.target;
    currentState.source = value;
    this.setState({ CreateQuoteInput: currentState });
  }

  render() {
    const {
      selectedAuthor,
      selectedTones,
      selectedTopics,
      CreateQuoteInput,
    } = this.state;
    return (
      <DefaultLayout>
        <Head>
          <title>Create Quote</title>
        </Head>
        <h1>Add a Quote</h1>
        <Form onSubmit={e => e.preventDefault()}>
          <Label for="name">Name this quote</Label>
          <Input
            type="text"
            name="name"
            value={CreateQuoteInput.name}
            onChange={this.handleChangeName}
            placeholder="Name the quote. Example: Stephen Colbert on yogurt and opera"
          />
          <Label for="body">Quote</Label>
          <Input
            type="textarea"
            rows="7"
            name="body"
            value={CreateQuoteInput.body}
            onChange={this.handleChangeBody}
            placeholder="Enter the content of the quote"
          />
          <Label for="authorId">Author</Label>
          <Query query={AllAuthors}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <Alert color="danger">{error.message}</Alert>;
              return (
                <ReactSelect
                  value={selectedAuthor}
                  onChange={this.handleChangeAuthorId}
                  options={data.allAuthors.map(item => ({ value: item.id, label: item.name }))}
                />
              );
            }}
          </Query>
          <Label for="topicIds">Topics</Label>
          <Query query={AllTopics}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <Alert color="danger">{error.message}</Alert>;
              return (
                <ReactSelect
                  isMulti
                  value={selectedTopics}
                  onChange={this.handleChangeTopicIds}
                  options={data.allTopics.map(item => ({ value: item.id, label: item.name }))}
                />
              );
            }}
          </Query>
          <Label for="toneIds">Tone</Label>
          <Query query={AllTones}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <Alert color="danger">{error.message}</Alert>;
              return (
                <ReactSelect
                  isMulti
                  value={selectedTones}
                  onChange={this.handleChangeToneIds}
                  options={data.allTones.map(item => ({ value: item.id, label: item.name }))}
                />
              );
            }}
          </Query>
          <Label for="note">Notes</Label>
          <Input
            type="textarea"
            name="note"
            rows="5"
            value={CreateQuoteInput.note}
            onChange={this.handleChangeNote}
            placeholder="Note to self"
          />
          <Label for="source">Source</Label>
          <Input
            type="textarea"
            name="note"
            rows="5"
            value={CreateQuoteInput.source}
            onChange={this.handleChangeSource}
            placeholder="If available, cite specific reference / source"
          />
          <Mutation
            mutation={CreateQuote}
            variables={{ input: CreateQuoteInput }}
          >
            {(createQuoteMutation, { loading, error, data }) => {
              if (loading) {
                return <Button color="secondary">Loading...</Button>;
              }
              if (error) {
                return (
                  <div>
                    <Button color="primary" onClick={createQuoteMutation}>Submit</Button>
                    <Alert color="danger">
                      Error: {error.message}
                    </Alert>
                  </div>
                );
              }
              if (data) {
                const { createQuote } = data;
                return (
                  <Alert color="success">
                    Success! View <a href={`/quote/${createQuote.slug}`}>{createQuote.name}</a>  
                  </Alert>
                );
              }
              return (
                <Button color="primary" onClick={createQuoteMutation}>Submit</Button>
              );
            }
            }
          </Mutation>
        </Form>
      </DefaultLayout>
    );
  }
}
