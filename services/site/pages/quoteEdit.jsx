import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Query, Mutation, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
 Button, Form, FormGroup, Label, Input, FormText, Alert, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import ReactSelect from 'react-select';
import withAuth from '../components/withAuth';
import DefaultLayout from '../layouts/Default';
import TaxCreateForm from './taxCreate';

const QuoteBySlug = gql`
  query QuoteBySlug($input: QuoteBySlugInput!) {
    quoteBySlug(input: $input) {
      id
      name
      body
      author {
        id
        name
      }
      topics {
        id
        name
      }
      tones {
        id
        name
      }
      note
      source
    }
  }
`;

const UpdateQuote = gql`
  mutation UpdateQuote($input: UpdateQuoteInput!) {
    updateQuote(input: $input) {
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

class QuoteEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      selectedAuthor: null,
      selectedTones: null,
      selectedTopics: null,
      UpdateQuoteInput: {
        name: '',
        body: '',
        authorId: '',
        topicIds: [],
        toneIds: [],
        note: '',
        source: '',
      },
      modalTone: false,
      modalTopic: false,
    };

    this.toggleModalTone = this.toggleModalTone.bind(this);
    this.toggleModalTopic = this.toggleModalTopic.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeBody = this.handleChangeBody.bind(this);
    this.handleChangeAuthorId = this.handleChangeAuthorId.bind(this);
    this.handleChangeTopicIds = this.handleChangeTopicIds.bind(this);
    this.handleChangeToneIds = this.handleChangeToneIds.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleChangeSource = this.handleChangeSource.bind(this);
  }

  componentDidMount() {
    const { quoteBySlug } = this.props.data;
    const topicIdsArr = quoteBySlug.topics.map(item => item.id);
    const topicFormValues = quoteBySlug.topics.map(item => ({ value: item.id, label: item.name }));
    const tonesIdsArr = quoteBySlug.tones.map(item => item.id);
    const tonesFormValues = quoteBySlug.tones.map(item => ({ value: item.id, label: item.name }));
    this.setState({
      selectedAuthor: { value: quoteBySlug.author.id, label: quoteBySlug.author.name },
      selectedTopics: topicFormValues,
      selectedTones: tonesFormValues,
      UpdateQuoteInput: {
        name: quoteBySlug.name,
        body: quoteBySlug.body,
        authorId: quoteBySlug.author.id,
        topicIds: topicIdsArr,
        toneIds: tonesIdsArr,
        note: quoteBySlug.note,
        source: quoteBySlug.source,
      }
    });
  }

  toggleModalTone() {
    this.setState(prevState => ({
      modalTone: !prevState.modalTone,
    }));
  }

  toggleModalTopic() {
    this.setState(prevState => ({
      modalTopic: !prevState.modalTopic,
    }));
  }

  handleChangeName(event) {
    const { UpdateQuoteInput } = { ...this.state };
    const currentState = UpdateQuoteInput;
    const { value } = event.target;
    currentState.name = value;
    this.setState({ UpdateQuoteInput: currentState });
  }

  handleChangeBody(event) {
    const { UpdateQuoteInput } = { ...this.state };
    const currentState = UpdateQuoteInput;
    const { value } = event.target;
    currentState.body = value;
    this.setState({ UpdateQuoteInput: currentState });
  }

  handleChangeAuthorId(selectedAuthor) {
    const { UpdateQuoteInput } = { ...this.state };
    const currentState = UpdateQuoteInput;
    if (selectedAuthor) {
      // const idArray = selectedAuthor.map(item => item.value);
      currentState.authorId = selectedAuthor.value;
    }
    if (selectedAuthor === null) {
      currentState.authorId = [];
    }
    this.setState({ UpdateQuoteInput: currentState });
    this.setState({ selectedAuthor });
  }

  handleChangeTopicIds(selectedTopics) {
    const { UpdateQuoteInput } = { ...this.state };
    const currentState = UpdateQuoteInput;
    if (selectedTopics) {
      const idArray = selectedTopics.map(item => item.value);
      currentState.topicIds = idArray;
    }
    if (selectedTopics === null) {
      currentState.topicIds = [];
    }
    this.setState({ UpdateQuoteInput: currentState });
    this.setState({ selectedTopics });
  }

  handleChangeToneIds(selectedTones) {
    const { UpdateQuoteInput } = { ...this.state };
    const currentState = UpdateQuoteInput;
    if (selectedTones) {
      const idArray = selectedTones.map(item => item.value);
      currentState.toneIds = idArray;
    }
    if (selectedTones === null) {
      currentState.toneIds = [];
    }
    this.setState({ UpdateQuoteInput: currentState });
    this.setState({ selectedTones });
  }

  handleChangeNote(event) {
    const { UpdateQuoteInput } = { ...this.state };
    const currentState = UpdateQuoteInput;
    const { value } = event.target;
    currentState.note = value;
    this.setState({ UpdateQuoteInput: currentState });
  }

  handleChangeSource(event) {
    const { UpdateQuoteInput } = { ...this.state };
    const currentState = UpdateQuoteInput;
    const { value } = event.target;
    currentState.source = value;
    this.setState({ UpdateQuoteInput: currentState });
  }

  render() {
    const {
      selectedAuthor,
      selectedTones,
      selectedTopics,
      UpdateQuoteInput,
      modalTone,
      modalTopic,
    } = this.state;
    return (
      <DefaultLayout>
        <Head>
          <title>Edit Quote</title>
        </Head>
        <h1>Edit Quote</h1>
        <Form onSubmit={e => e.preventDefault()}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={UpdateQuoteInput.name}
              onChange={this.handleChangeName}
              placeholder="Name the quote. Example: Stephen Colbert on yogurt and opera"
            />
          </FormGroup>
          <FormGroup>
            <Label for="body">Quote</Label>
            <Input
              type="textarea"
              rows="7"
              name="body"
              value={UpdateQuoteInput.body}
              onChange={this.handleChangeBody}
              placeholder="Enter the content of the quote"
            />
          </FormGroup>
          <FormGroup>
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
          </FormGroup>
          <FormGroup>
            <Label for="topicIds">Topics</Label>
            <div>
              <Button color="link" onClick={this.toggleModalTopic}>Add term</Button>
              <Modal isOpen={modalTopic} toggle={this.toggleModalTopic}>
                <ModalHeader toggle={this.toggleModalTopic} charCode="X">Add term to Topic taxonomy</ModalHeader>
                <ModalBody>
                  <TaxCreateForm taxName="topics" />
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggleModalTopic}>Close</Button>
                </ModalFooter>
              </Modal>
            </div>
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
          </FormGroup>
          <FormGroup>
            <Label for="toneIds">Tone</Label>
            <div>
              <Button color="link" onClick={this.toggleModalTone}>Add term</Button>
              <Modal isOpen={modalTone} toggle={this.toggleModalTone}>
                <ModalHeader toggle={this.toggleModalTone} charCode="X">Add term to Tone taxonomy</ModalHeader>
                <ModalBody>
                  <TaxCreateForm taxName="tones" />
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggleModalTone}>Close</Button>
                </ModalFooter>
              </Modal>
            </div>
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
          </FormGroup>
          <FormGroup>
            <Label for="note">Notes</Label>
            <Input
              type="textarea"
              name="note"
              rows="5"
              value={UpdateQuoteInput.note}
              onChange={this.handleChangeNote}
              placeholder="Note to self"
            />
          </FormGroup>
          <FormGroup>
            <Label for="source">Source</Label>
            <Input
              type="textarea"
              name="note"
              rows="5"
              value={UpdateQuoteInput.source}
              onChange={this.handleChangeSource}
              placeholder="If available, cite specific reference / source"
            />
          </FormGroup>
          <Mutation
            mutation={UpdateQuote}
            variables={{ input: { id: this.props.data.quoteBySlug.id, payload: UpdateQuoteInput } }}
          >
            {(updateQuoteMutation, { loading, error, data }) => {
              if (loading) {
                return <Button color="secondary">Loading...</Button>;
              }
              if (error) {
                return (
                  <div>
                    <Button color="primary" onClick={updateQuoteMutation}>Submit</Button>
                    <Alert color="danger">
                      Error: {error.message}
                    </Alert>
                  </div>
                );
              }
              if (data) {
                const { updateQuote } = data;
                return (
                  <Alert color="success">
                    Success! View <a href={`/quote/${updateQuote.slug}`}>{updateQuote.name}</a>  
                  </Alert>
                );
              }
              return (
                <Button color="primary" onClick={updateQuoteMutation}>Submit</Button>
              );
            }
            }
          </Mutation>
        </Form>
      </DefaultLayout>
    );
  }
}

const QuoteEditFormWithData = graphql(QuoteBySlug, {
  options: slug => ({
    variables: {
      input: slug,
    },
  }),
})(withAuth(QuoteEditForm));

QuoteEditFormWithData.getInitialProps = ({ query }) => {
  const { slug } = query;
  return { slug };
};

QuoteEditFormWithData.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default QuoteEditFormWithData;
