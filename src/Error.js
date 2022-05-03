import React from "react";

/** Handles display of any error thrown. */
function Error({ error }) {

  return (
    <div className="alert alert-warning" role="alert">
      {error}
    </div>
  );
}

export default Error;