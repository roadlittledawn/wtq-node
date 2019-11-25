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
            <h2>Quote</h2>
            <p>{quote.body}</p>
            <h2>Author</h2>
            {quote.author.name}
            {quote.topics.length > 0 && <h2>Topics</h2>}
            {quote.topics && quote.topics.map(item => <><p>{item.name}</p></>)}
            {quote.tones.length > 0 && <h2>Tone</h2>}
            {quote.tones && quote.tones.map(item => <><p>{item.name}</p></>)}
            {quote.note && <h2>Note</h2>}
            {quote.note && quote.note}
            {quote.source && <h2>Source</h2>}
            {quote.source && quote.source}
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
