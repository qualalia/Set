import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Label } from "semantic-ui-react";
import { Board, EndGame } from "../components";
import {
  setClickedCards,
  newGame,
  getGame,
  updateGame,
  //  join,
  showHint,
  stumped,
} from "../store";

const Game = props => {
  const game = useSelector(state => state.game);
  const user = useSelector(state => state.user);
  let clickedCards = useSelector(state => state.setClickedCards);
  const { nextCardPos, cardsLeft, gg, sets } = game;
  const dispatch = useDispatch();
  const { code } = props;

  useEffect(
    () => {
      if (code) {
        dispatch(getGame(code));
      } else {
        dispatch(newGame());
      }
    },
    [code],
  );

  if (clickedCards.length === 3) {
    console.log(clickedCards);
    dispatch(updateGame(clickedCards, user.id, game.id));
    dispatch(setClickedCards([]));
  }

  const handleStumped = () => {
    dispatch(stumped(game.id));
  };

  const handleHint = () => {
    dispatch(showHint(game.cardsOnTheBoard));
  };

  return !gg ? (
    <div>
      <div id="playing-area">
        <Board clickedCards={clickedCards} />
      </div>
      <div id="info">
        <Label className="info-div" size="big" color="yellow">
          Your Sets
          <Label.Detail>{sets}</Label.Detail>
        </Label>
        <Label className="info-div" size="big" color="orange">
          Cards Left
          <Label.Detail>{cardsLeft}</Label.Detail>
        </Label>
      </div>
      <div id="stumped-hint">
        <Button
          className="stumped-btn"
          color="violet"
          size="big"
          disabled={!!(81 - nextCardPos < 3)}
          onClick={handleStumped}
        >
          Stumped?
        </Button>
        <Button
          className="stumped-btn"
          color="blue"
          size="big"
          disabled={false}
          onClick={handleHint}
        >
          Hint
        </Button>
      </div>
    </div>
  ) : (
    <EndGame code={code} sets={sets} />
  );
};

export default withRouter(Game);
