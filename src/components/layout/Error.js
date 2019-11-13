import React from "react";

function Error(props) {
  return (
    <div className="col-md-12">
      <div className="error-template">
        <h1>Oops!</h1>
        <h2>{props.error}</h2>
        <div className="error-details">
          Sorry, an error has occured, Requested page not found!
        </div>
        <div className="error-actions">
          <a href="/" className="btn btn-primary btn-lg">
            <span className="glyphicon glyphicon-home"></span>
            Take Me Home{" "}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Error;
