import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Alert } from 'reactstrap';

import DefaultLayout from '../layouts/Default';

const wordBySlug = gql`
  query WordPage($input: WordBySlugInput!) {
    wordBySlug(input: $input) {
      id
      name
      slug
      partsOfSpeech {
        name
        id
      }
      contexts {
        name
      }
      definition
      tones {
        name
      }
    }
  }
`;

const WordPage = ({ slug }) => (
  <DefaultLayout>
    <Query query={wordBySlug} variables={{ input: { slug } }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Alert color="danger">{error.message}</Alert>;
        const { wordBySlug: word } = data;
        return (
          <>
            <Head>
              <title>{word.name}</title>
            </Head>
            <h1>{word.name}</h1>
            <h2>Definition</h2>
            <p>{word.definition}</p>
            {word.partsOfSpeech && <h2>Part of Speech</h2>}
            {word.partsOfSpeech && word.partsOfSpeech.map(item => <><p>{item.name}</p></>)}
            {word.partsOfSpeech && <h2>Context</h2>}
            {word.contexts && word.contexts.map(item => <><p>{item.name}</p></>)}
            {word.partsOfSpeech && <h2>Tone</h2>}
            {word.tones && word.tones.map(item => <><p>{item.name}</p></>)}
          </>
        );
      }}
    </Query>
  </DefaultLayout>
);

WordPage.getInitialProps = ({ query }) => {
  const { slug } = query;
  return { slug };
};

WordPage.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default WordPage;
