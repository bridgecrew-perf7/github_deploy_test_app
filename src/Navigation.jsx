import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div id="navigationDiv">
      <Link to="/">Home</Link>
      <Link to="/roulette">Roulette</Link>
    </div>
  );
}

export default Navigation;
