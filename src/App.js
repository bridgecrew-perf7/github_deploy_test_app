import "./App.css";
import Roulette from "./Roulette/index";
import Home from "./Home";
import { HashRouter, Route } from "react-router-dom";
import Navigation from "./Navigation";

function App() {
  return (
    <HashRouter>
      <Navigation />
      <h1 id="header">HIHI This is just for deploying pages in Github!</h1>
      <Route path="/" exact={true} component={Home}></Route>
      <Route path="/roulette" component={Roulette}></Route>
    </HashRouter>
  );
}

export default App;
