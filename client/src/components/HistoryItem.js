import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function HistoryItem({
  history: { id, title, event_date_utc }
}) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>Title: {title}</h4>
          <p>
            Date: <Moment format="YYYY-MM-DD HH:mm">{event_date_utc}</Moment>
          </p>
        </div>
        <div className="col-md-3">
          <Link to={`/history/${id}`} className="btn btn-secondary">
            History Details
          </Link>
        </div>
      </div>
    </div>
  );
}
