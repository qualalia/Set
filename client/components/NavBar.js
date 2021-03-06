import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { Menu, Dropdown, Button } from "semantic-ui-react";
import { logout } from "../store";

const Navbar = ({ history }) => {
  const user = useSelector(state => state.user);
  const isLoggedIn = !!user.email;
  const dispatch = useDispatch();

  const options = [
    {
      key: 1,
      text: "Solo",
      icon: "user",
      value: 1,
      onClick: () => {
        history.push("/solo");
      },
    },
    {
      key: 2,
      text: <i>Multiplayer (coming soon)</i>,
      icon: "users",
      value: 2,
      onClick: () => history.push("/join"),
      disabled: true,
    },
  ];

  return (
    <nav>
      <div className="nav-items">
        <div id="navbar-left">
          <div className="rules">
            <Button color="black" onClick={() => history.push("/rules")}>
              Rules
            </Button>
          </div>
          <div className="new-game">
            <Menu compact inverted>
              <Dropdown text="New Game" options={options} simple item />
            </Menu>
          </div>
        </div>
        <div className="home-login">
          <Button
            color="black"
            onClick={() =>
              isLoggedIn ? history.push("/solo") : history.push("/login")
            }
          >
            {user.username || "Login"}
          </Button>
          {user.email && (
            <Button color="black" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          )}
          <Button color="black" onClick={() => history.push("/signup")}>
            Signup
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
