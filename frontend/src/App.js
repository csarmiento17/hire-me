import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Home from "./containers/Home/Loadable";
import MenuAppBar from "./components/AppBar";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import ContactUs from "./components/ContactUs";
import PageNotFound from "./components/NotFound";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
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
      <Router>
        <Switch>
          <Container maxWidth="xl">
            <MenuAppBar />
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/contact-us" component={ContactUs}></Route>
            <Route path="*" component={PageNotFound} />
          </Container>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
