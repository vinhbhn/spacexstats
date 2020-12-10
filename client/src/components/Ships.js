import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import MissionKey from "./MissionKey";
import NavBars from "./Navbars";

const SHIPS_QUERY = gql`
  query ShipsQuery {
    ships {
      ship_id
      ship_name
      active
      year_built
      image
    }
  }
`;

function ShipItem({ ship: { ship_name, active, year_built, image } }) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>
            Ship Name:{" "}
            <span className={active ? "text-success" : "text-danger"}>
              {ship_name}
            </span>
          </h4>
          <p>
            Year Built: {year_built} |{" "}
            <span class="text-muted">Image: {image}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default class Ships extends Component {
  render() {
    return (
      <>
        <NavBars />
        <h4 className="display-4 my-3">Ships</h4>
        <MissionKey />
        <Query query={SHIPS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            return (
              <>
                {data.ships.map(ship => (
                  <ShipItem key={ship.ship_id} ship={ship} />
                ))}
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
