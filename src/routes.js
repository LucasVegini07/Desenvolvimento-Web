import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Contato from "./pages/Contato";
import Compromisso from "./pages/Compromisso";

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
      <Route path="/contato" component={Contato} />
      <Route path="/compromisso" component={Compromisso} />
    </Switch>
  );
}
