import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-unfetch';

export default (req) => {
  const headers = req ? req.headers : {};
  const uri = req ? 'http://localhost/graphql' : '/graphql';
  return {
    link: ApolloLink.from([
      new HttpLink({
        uri,
        headers,
        fetch,
      }),
    ]),
  };
};
