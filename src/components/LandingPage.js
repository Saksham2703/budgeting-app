import React from "react";
import { Link } from "react-router-dom";

import "../theme.css";

const LandingPage = () => {
  return (
    <div className="container">
      <div className="header">Manage your finances, simplified</div>
      <div className="footer">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
