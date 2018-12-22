import React from 'react';
import Head from 'next/head';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Alert } from 'reactstrap';
import DefaultLayout from '../layouts/Default';

const allWords = gql`
  query AllWords {
    allWords {
      id
      name
      definition
      note
      partsOfSpeech {
        id
        name
      }
    }
  }
`;

export default () => (
  <DefaultLayout>
    <Head>
      <title>Words</title>
    </Head>
    <h1>Words</h1>
    <Query query={allWords}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Alert color="danger">{error.message}</Alert>;
        return data.allWords.map(word => (
          <div key={word.id}>
            <p>{word.name}</p>
          </div>
        ));
      }}
    </Query>
  </DefaultLayout>
);
