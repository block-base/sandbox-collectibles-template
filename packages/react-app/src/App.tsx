import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/index";
import TokenPage from "./pages/tokens/_id";

import "./styles/tailwind.css";
import "./styles/font.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/tokens/:id" exact>
          <TokenPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
