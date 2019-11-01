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
      definition
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
            <p>{phrase.definition}</p>
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
