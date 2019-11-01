import React from 'react';
import Head from 'next/head';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Alert } from 'reactstrap';
import Link from 'next/link';
import DefaultLayout from '../layouts/Default';

const allPhrases = gql`
  query PhrasesPage {
    allPhrases {
      id
      name
      slug
      definition
      note
    }
  }
`;

export default () => (
  <DefaultLayout>
    <Head>
      <title>Phrases</title>
    </Head>
    <h1>Phrases</h1>
    <Query query={allPhrases}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Alert color="danger">{error.message}</Alert>;
        return data.allPhrases.map(phrase => (
          <p key={phrase.id}>
            <Link href={`/phrase?slug=${phrase.slug}`} as={`/phrase/${phrase.slug}`}>
              <a>{phrase.name}</a>
            </Link>
          </p>
        ));
      }}
    </Query>
  </DefaultLayout>
);
