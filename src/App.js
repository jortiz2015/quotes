import NotFound from "./pages/NotFound";
import { Route, Switch, Redirect } from "react-router";
import Layout from "./components/layout/Layout";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail";

function App() {

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes"/>
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes/>
        </Route>
        <Route path="/quotes/:id">
          <QuoteDetail/> 
        </Route>
        <Route path="/add-quote">
          <NewQuote/>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
