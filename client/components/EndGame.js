import React from "react";
import { useHistory } from "react-router-dom";
import { Header, Button } from "semantic-ui-react";

const EndGame = props => {
  const { code, sets } = props;
  const history = useHistory();
  return code ? (
    <div className="game-board gg">
      <Header
        inverted
        as="h1"
        size="huge"
        textAlign="center"
        content="GAME OVER"
      />
      <Header
        className="gg"
        inverted
        as="h2"
        textAlign="center"
        content={`You got ${sets === 1 ? sets + " set." : sets + " sets."}`}
      />
      <Header textAlign="center">
        <Button
          color="violet"
          size="huge"
          onClick={() => history.push("/solo")}
        >
          <i className="plus icon" />
          New Game
        </Button>
      </Header>
    </div>
  ) : (
    <Header inverted as="h1" content="error. how did you get here?" />
  );
};

export default EndGame;

/*style={{color: 'white'}}>
   GAME OVER
   </h1>

   <h1 style={{color: 'white'}}>error. how did you get here?</h1>
 */
