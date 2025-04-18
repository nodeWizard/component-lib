"use client";

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:8081/graphql',
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
});

const wsClient = createClient({
  url: 'ws://localhost:8081/graphql',
});

wsClient.on('opened', () => {
  console.log('WebSocket connecté');
});

wsClient.on('error', (err) => {
  console.error('Erreur WebSocket:', err);
});

const wsLink = new GraphQLWsLink(
  wsClient
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind == 'OperationDefinition' &&
      definition.operation == 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}