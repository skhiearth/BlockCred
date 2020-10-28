import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Verify, Institute } from "./components";

function App() {
  return (
    <div className="App" style={{height:800}}>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/verify" exact component={() => <Verify />} />
          <Route path="/institute" exact component={() => <Institute />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;