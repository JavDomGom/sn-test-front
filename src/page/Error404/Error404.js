import React from "react";
import { Link } from "react-router-dom";
import Error404Image from "../../assets/png/error-404.png";
import LogoWhiteNot from "../../assets/png/not-logo-white.png";

import "./Error404.scss";

export default function Error404() {
  return (
    <div className="error404">
      <img src={LogoWhiteNot} alt="Not" />
      <img src={Error404Image} alt="Error 404" />
      <Link to="/">Back to homepage</Link>
    </div>
  );
}
