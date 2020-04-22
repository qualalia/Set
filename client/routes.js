import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import {
  Homescreen,
  Login,
  Signup,
  UserHome,
  Game,
  EndGame,
  Join,
} from "./components";
import { me } from "./store";
//import {join} from './store/players.js'

const Routes = () => {
  const user = useSelector(state => state.user);
  const isLoggedIn = !!user.email;
  const player = user;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(me);
  }, []);
  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}
      <Route exact path="/" render={() => <Game />} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      {isLoggedIn && (
        <Switch>
          {/* Logged in */}
          <Route path="/home" component={UserHome} />
        </Switch>
      )}
      <Route path="/solo" render={() => <Game />} />
      <Route
        path="/play/:id"
        render={props => <Game code={props.match.params.id} />}
      />
      <Route
        path="/play/:id/gg"
        render={props => <EndGame code={props.match.params.id} />}
      />
      <Route path="/join" render={() => <Join userId={user.id} />} />
    </Switch>
  );
};

export default withRouter(Routes);
