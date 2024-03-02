import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <div className="links">
        <h1>
          <Link className="link" to="/">
            Home
          </Link>
        </h1>
        <h1>
          {" "}
          <Link className="link" to="/History">
            History
          </Link>
        </h1>
      </div>
    </nav>
  );
};

export default Navigation;
