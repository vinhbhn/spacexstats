import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import NavBars from "./Navbars";

const LANDINGPADS_QUERY = gql`
  query LandingPadsQuery {
    landpads {
      id
      full_name
      wikipedia
    }
  }
`;

function LandingPadItem({ landpad: { id, full_name, wikipedia } }) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>Name: {full_name}</h4>
          <p>
            ID: {id} |{" "}
            <span className="text-muted">Wikipedia: {wikipedia}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default class LandingPads extends Component {
  render() {
    return (
      <>
        <NavBars />
        <h4 className="display-4 my-3">LandingPads</h4>
        <Query query={LANDINGPADS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            return (
              <>
                {data.landpads.map((landpad) => (
                  <LandingPadItem key={landpad.id} landpad={landpad} />
                ))}
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
