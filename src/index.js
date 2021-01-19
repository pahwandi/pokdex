import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "reportWebVitals";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import Router from "router";
import './index.css';
import Store from "data/store";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql/'
})

const client = new ApolloClient({
  cache,
  link
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Store>
        <Router />
      </Store>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
