import React from 'react';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'

import { PartyApp } from './pages/party-app/party-app'
import { Routes } from './routes'

// https://cors-anywhere.herokuapp.com/
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
  cache: new InMemoryCache(),
})

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <Box m={4}>
      <Container component={Paper} maxWidth="md">
        <BrowserRouter>
          <Switch>
            <Route exact path={Routes.Home} component={PartyApp} />
            <Redirect to={Routes.Home} />
          </Switch>
        </BrowserRouter>
      </Container>
    </Box>
  </ApolloProvider>
)

export default App
