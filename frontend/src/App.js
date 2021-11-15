import { Switch, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Home from "./containers/Home/Loadable";
import MenuAppBar from "./components/AppBar";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Switch>
      <>
        <Container maxWidth="xl">
          <MenuAppBar />
          <Route exact path="/" component={Home}></Route>
        </Container>
      </>
    </Switch>
    </ApolloProvider>
  );
}

export default App;
