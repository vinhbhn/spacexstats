import React, { Component } from "react";
import Moment from "react-moment";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import MissionKey from "./MissionKey";
import NavBars from "./Navbars";

const DRAGONS_QUERY = gql`
  query DragonsQuery {
    dragons {
      id
      name
      active
      first_flight
      wikipedia
    }
  }
`;

function DragonItem({ dragon: { name, active, first_flight, wikipedia } }) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>
            Name:{" "}
            <span className={active ? "text-success" : "text-danger"}>
              {name}
            </span>
          </h4>
          <p>
            First Flight: <Moment format="YYYY-MM-DD">{first_flight}</Moment> |{" "}
            <span className="text-muted">Wikipedia: {wikipedia}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default class Dragons extends Component {
  render() {
    return (
      <>
        <NavBars />
        <h4 className="display-4 my-3">Dragons</h4>
        <MissionKey />
        <Query query={DRAGONS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            return (
              <>
                {data.dragons.map((dragon) => (
                  <DragonItem key={dragon.id} dragon={dragon} />
                ))}
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
