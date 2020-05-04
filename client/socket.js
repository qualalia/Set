import io from "socket.io-client";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getGame } from "./store/game.js";

const Socket = props => {
  const socket = io(window.location.origin);
  const dispatch = useDispatch();
  useEffect(
    () => {
      socket.on("connect", () => {
        //        console.log(`Connected!`)
      });
      socket.on("game-update", code => {
        dispatch(getGame(code));
      });
    },
    [socket],
  );
  return null;
};

export default Socket;
