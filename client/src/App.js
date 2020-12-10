import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.png";
import "./App.css";

import Launches from "./components/Launches";
import Launch from "./components/Launch";
import History from "./components/History";
import Histories from "./components/Histories";
import Ships from "./components/Ships";
import Dragons from "./components/Dragons";
import LandingPads from "./components/LandingPads";
import Payloads from "./components/Payloads";
import NavBars from "./components/Navbars";

const client = new ApolloClient({
  uri: "/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <a href="/">
              <img
                src={logo}
                alt="SpaceX"
                style={{ width: 700, display: "block", margin: "auto" }}
              />
            </a>

            <Route exact path="/" component={NavBars} />
            <Route exact path="/launches" component={Launches} />
            <Route exact path="/launch/:flight_number" component={Launch} />
            <Route exact path="/history" component={Histories} />
            <Route exact path="/history/:id" component={History} />

            <Route exact path="/ships" component={Ships} />
            <Route exact path="/dragons" component={Dragons} />
            <Route exact path="/landpads" component={LandingPads} />
            <Route exact path="/payloads" component={Payloads} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
