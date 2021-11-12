import { Switch, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Home from "./containers/Home/Loadable";
import MenuAppBar from "./components/AppBar";

function App() {
  return (
    <Switch>
      <>
        <Container maxWidth="xl">
          <MenuAppBar />
          <Route exact path="/" component={Home}></Route>
        </Container>
      </>
    </Switch>
  );
}

export default App;
