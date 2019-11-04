import React from 'react';
import Head from 'next/head';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Alert, Card, CardText, CardBody,
  CardTitle,
} from 'reactstrap';
import Link from 'next/link';
import DefaultLayout from '../layouts/Default';

const allQuotes = gql`
  query QuotesPage {
    allQuotes {
      id
      name
      slug
      author {
        name
      }
      body
      note
    }
  }
`;

export default () => (
  <DefaultLayout>
    <Head>
      <title>Quotes</title>
    </Head>
    <h1>Quotes</h1>
    <Query query={allQuotes}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Alert color="danger">{error.message}</Alert>;
        return data.allQuotes.map(quote => (
          <div>
            <Card>
              <CardBody>
                <CardTitle>
                  <Link href={`/quote?slug=${quote.slug}`} as={`/quote/${quote.slug}`}>
                    <a>{quote.name}</a>
                  </Link>
                </CardTitle>
                <CardText>
                  {quote.body}
                </CardText>
              </CardBody>
            </Card>
          </div>
        ));
      }}
    </Query>

  </DefaultLayout>
);
