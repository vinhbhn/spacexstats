import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import MissionKey from "./MissionKey";
import NavBars from "./Navbars";

const PAYLOADS_QUERY = gql`
  query PayloadsQuery {
    payloads {
      payload_id
      reused
      nationality
    }
  }
`;

function PayloadItem({ payload: { payload_id, reused, nationality } }) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>
            Payload ID:{" "}
            <span className={reused ? "text-success" : "text-danger"}>
              {payload_id}
            </span>
          </h4>
          <p>Nationality: {nationality}</p>
        </div>
      </div>
    </div>
  );
}

export default class Payloads extends Component {
  render() {
    return (
      <>
        <NavBars />
        <h4 className="display-4 my-3">Payloads</h4>
        <MissionKey />
        <Query query={PAYLOADS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            return (
              <>
                {data.payloads.map(payload => (
                  <PayloadItem key={payload.payload_id} payload={payload} />
                ))}
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
