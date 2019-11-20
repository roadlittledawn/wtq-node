import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Alert } from 'reactstrap';

import DefaultLayout from '../layouts/Default';

const quoteBySlug = gql`
  query QuotePage($input: QuoteBySlugInput!) {
    quoteBySlug(input: $input) {
      id
      name
      body
    }
  }
`;

const QuotePage = ({ slug }) => (
  <DefaultLayout>
    <Query query={quoteBySlug} variables={{ input: { slug } }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Alert color="danger">{error.message}</Alert>;
        const { quoteBySlug: quote } = data;
        return (
          <>
            <Head>
              <title>{quote.name}</title>
            </Head>
            <h1>{quote.name}</h1>
            <p>{quote.body}</p>
          </>
        );
      }}
    </Query>
  </DefaultLayout>
);

QuotePage.getInitialProps = ({ query }) => {
  const { slug } = query;
  return { slug };
};

QuotePage.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default QuotePage;
