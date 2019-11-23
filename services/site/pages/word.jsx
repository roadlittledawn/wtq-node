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
            {word.partsOfSpeech && word.partsOfSpeech.map(item => <><h2>Parts of Speech</h2><p>{item.name}</p></>)}
            {word.contexts && word.contexts.map(item => <><h2>Contexts</h2><p>{item.name}</p></>)}
            {word.tones && word.tones.map(item => <><h2>Tones</h2><p>{item.name}</p></>)}
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
