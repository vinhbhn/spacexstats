import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

const HISTORY_QUERY = gql`
  query HistoryQuery($id: Int!) {
    history(id: $id) {
      id
      title
      flight_number
      details
      event_date_utc
      links {
        wikipedia
      }
    }
  }
`;

export class History extends Component {
  render() {
    let { id } = this.props.match.params;
    id = parseInt(id);
    return (
      <Query query={HISTORY_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);

          const {
            title,
            flight_number,
            details,
            links: { article, wikipedia }
          } = data.history;

          return (
            <div>
              <h1 className="display-4 my-3">
                <span className="text-dark">Title:</span> {title}
              </h1>
              <h4 className="mb-3">History Details</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  Flight Number: {flight_number}
                </li>
                <li className="list-group-item">Details: {details}</li>
                <li className="list-group-item">Article: {article}</li>
                <li className="list-group-item">Wikipedia: {wikipedia}</li>
              </ul>
              <hr />
              <Link to="/history" className="btn btn-secondary">
                Back
              </Link>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default History;
