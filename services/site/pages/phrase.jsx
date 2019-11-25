import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Alert } from 'reactstrap';

import DefaultLayout from '../layouts/Default';

const phraseBySlug = gql`
  query PhrasePage($input: PhraseBySlugInput!) {
    phraseBySlug(input: $input) {
      id
      name
      slug
      definition
      topics {
        id
        name
      }
      tones {
        id
        name
      }
      contexts {
        id
        name
      }
      note
      source
    }
  }
`;

const PhrasePage = ({ slug }) => (
  <DefaultLayout>
    <Query query={phraseBySlug} variables={{ input: { slug } }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Alert color="danger">{error.message}</Alert>;
        const { phraseBySlug: phrase } = data;
        return (
          <>
            <Head>
              <title>{phrase.name}</title>
            </Head>
            <h1>{phrase.name}</h1>
            <h2>Definition</h2>
            <p>{phrase.definition}</p>
            {phrase.topics.length > 0 && <h2>Topics</h2>}
            {phrase.topics && phrase.topics.map(item => <><p>{item.name}</p></>)}
            {phrase.contexts.length > 0 && <h2>Context</h2>}
            {phrase.contexts && phrase.contexts.map(item => <><p>{item.name}</p></>)}
            {phrase.tones.length > 0 && <h2>Tone</h2>}
            {phrase.tones && phrase.tones.map(item => <><p>{item.name}</p></>)}
            {phrase.note && <h2>Note</h2>}
            {phrase.note && phrase.note}
            {phrase.source && <h2>Source</h2>}
            {phrase.source && phrase.source}
          </>
        );
      }}
    </Query>
  </DefaultLayout>
);

PhrasePage.getInitialProps = ({ query }) => {
  const { slug } = query;
  return { slug };
};

PhrasePage.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default PhrasePage;
