import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import page from '../pages/page';
import { Redirect, useParams } from "react-router-dom";
import { getSocket } from '../websocket';
import { buttonStyle } from "../styles/buttonStyle"
//Redux
import { AppDispatch, RootState } from '../redux/store';
import { connect, useSelector } from 'react-redux';
//Player
import { Player } from '../redux/api/getPlayerApi';
import { SelectPlayer } from '../redux/selector/getPlayerSelector';
//Game
import { SelectGame } from '../redux/selector/getGameSelector';
import { fetchGame } from "../redux/thunk/getGameThunk";
import { Game as GameInterface } from '../redux/api/getGameApi';
//Board
import { fetchCurrBoard } from "../redux/thunk/getCurrBoardThunk";
import { SelectCurrBoard  } from '../redux/selector/getCurrBoardSelector';
import { BoardSquare } from '../redux/api/addMoveApi';
//Board components
import { Square, Piece, Double } from '../components';
//Turn
import { SelectChangeTurn } from '../redux/selector/changeTurnSelector';
import {changeTurn } from "../redux/thunk/changeTurnThunk";
import { OtherPlayerId, Turn } from '../redux/api/changeTurnApi';
//Set colors
import { setColors } from "../redux/thunk/setColorsThunk";
import { SetColor } from '../redux/api/setColorsApi';
import { FetchStatus } from '../redux/util/fetchStatus';
//Set winner
import { SelectSetWinner } from '../redux/selector/setWinnerSelector';
import { setWinnerReset } from "../redux/reducer/setWinnerReducer"
import { setWinner } from "../redux/thunk/setWinnerThunk";
import { Winner } from "../redux/api/setWinnerApi";
//create game
import { createGameReset } from "../redux/reducer/createGameReducer"
//add second player
import { addSecondPlayerReset } from "../redux/reducer/addSecondPlayerReducer"
//Box
import Box from '../components/Box';

interface StateProps {
  player?: Player;
  game?: GameInterface;
  currBoard?: BoardSquare[][];
  turn?: Turn;
  setWinnerFetch: FetchStatus; 
}

interface DispatchProps {
  getGame: (id: number) => void;
  getCurrBoard: (id: number) => void;
  changeTurn: (other_player_id: OtherPlayerId, game_id: number) => void;
  setColors: (colorInfo: SetColor, game_id: number) => void;
  resetSetWinner: () => void;
  setWinner: (id: number, winner_id: Winner) => void;
  resetCreateGame: () => void;
  resetAddSecondPlayer: () => void;
}

const Game = (props: StateProps & DispatchProps) => {
    const { id } = useParams<{ id: string }>();
    const { getGame, getCurrBoard, game, player, resetCreateGame, resetAddSecondPlayer } = props;
    const [players, setPlayers] = useState([] as number[]);
    const [gameChanged, setGameChanged] = useState(true);
    const [gameInfoChanged, setGameInfoChanged] = useState(false);
    const winner = useSelector(SelectCurrBoard.winner);
    const winnerWasSet = useSelector(SelectSetWinner.status);

    useEffect(() => {
      resetCreateGame();
      resetAddSecondPlayer();
    });

    useEffect(() => {
      if (gameChanged) {
        getGame(parseInt(id));
        getCurrBoard(parseInt(id));
        setGameChanged(false);
      }    
    }, [gameChanged]);

    useEffect(() => {
      if (gameInfoChanged) {
        getGame(parseInt(id));
        setGameInfoChanged(false);
      }      
    }, [gameInfoChanged]);

    useEffect(() => {
      if (game && winner && winner !== 'NO_WINNER') {
        // Handle winner logic
        if (game.player_one_color !== null && game.player_two_id !== null) {
          const winnerId = game.player_one_color === winner ? game.player_one_id : game.player_two_id;
          props.setWinner(parseInt(id), {winner_id: winnerId}) 
        }

      }
    }, [winner]);

    useEffect(() => {
      //join game room
      const socket = getSocket('game');

      socket.on('connect', () => {
          socket.emit("join_game", parseInt(id));
      });

      socket.on('players_in_room', (players) => {
          setPlayers(players);
      })

      socket.on('game_changed', () => {
          setGameChanged(true);
      })

      socket.on('second_player', () => {
        setGameInfoChanged(true);
    })

    socket.on('color_set', () => {
      setGameInfoChanged(true);
    })

    socket.on('winner_set', () => {
      setGameInfoChanged(true);
      alert(`The game is over! Someone gave up!`);
    })

      return () => {
          socket.disconnect();
      }
    
    }, [id]);

  if ( !game || !player || !props.currBoard){
    return <></>;
  }

  const otherPlayerId = game.player_one_id === player.player_id ? game.player_two_id : game.player_one_id;
  const pickYourColor = game.player_two_id && !game.player_one_color;
  const yourColor: string | null = player.player_id === game.player_one_id ? game.player_one_color : game.player_two_color;

  const changeTurnHandler = () => {
    otherPlayerId && props.changeTurn({other_player_id: otherPlayerId}, parseInt(id));
  }

  return (
    <Container>
      <div className="players-container">
        <Box>{game.player_one_username}</Box>&nbsp; VS &nbsp;<Box>{game.player_two_username ? game.player_two_username : "???"}</Box>
      </div>

      {pickYourColor && 
      <div className="players-container">
        <p>Pick your color:</p>
        {otherPlayerId && <button disabled={game.player_one_color !== null} onClick={() => props.setColors({ player_one_id: game.player_one_id, player_id: player.player_id || 0, color: "black"}, parseInt(id))}>Black</button>}
        {otherPlayerId && <button disabled={game.player_one_color !== null} onClick={() => props.setColors({ player_one_id: game.player_one_id, player_id: player.player_id || 0, color: "white"}, parseInt(id))}>White</button>}
      </div>
      }

      {yourColor !== null && 
      <div className="players-container">
        <p>Your color is: {yourColor}</p>
      </div>
      }   

      { game.player_one_color !== null && 
        <div className="players-container">
        <p>{game.turn === player.player_id ? "It is your turn" : "It is not your turn"}</p>
        {otherPlayerId && <button disabled={game.turn !== player.player_id} onClick={changeTurnHandler}>Change Turn</button>}
    </div>
      }

      {game.player_one_color !== null && 
            <div className="players-container">
            {otherPlayerId && <button disabled={game.winner_id !== null} onClick={() => props.setWinner(parseInt(id), {winner_id: otherPlayerId}) }>Give Up?</button>}
          </div>
      }

      
    { yourColor && <div className="board" style={{transform: `${yourColor === "black" ? "rotateX(0)" : "rotateX(180deg)"}`}}>
      {props.currBoard.map(row => row.map(square => {
        if (square.squareColor === 'black') {
          if (square.piece === null) {
            return <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true} key={square.location.toString()}></Square>
          } else if (square.piece.color === 'white' && square.piece.isDouble === false) {
            return(
            <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true} key={square.location.toString()}>
              <Piece color="white" id={square.piece.id} isDouble={square.piece.isDouble} squareLocation={square.location}></Piece>
            </Square>
            )
          } else if (square.piece.color === 'black' && square.piece.isDouble === false) {
            return(
            <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true} key={square.location.toString()}>
              <Piece color="black" id={square.piece.id} isDouble={square.piece.isDouble} squareLocation={square.location}></Piece>
            </Square>
            )
          } else if (square.piece.color === 'white' && square.piece.isDouble === true) {
            return(
            <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true} key={square.location.toString()}>
              <Piece color="white" id={square.piece.id} isDouble={square.piece.isDouble} squareLocation={square.location}>
                <Double color="white"></Double>
              </Piece>
            </Square>
            )
          } else if (square.piece.color === 'black' && square.piece.isDouble === true) {
            return(
            <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true} key={square.location.toString()}>
              <Piece color="black" id={square.piece.id} isDouble={square.piece.isDouble} squareLocation={square.location}>
                <Double color="black"></Double>
              </Piece>
            </Square>
            )
          }
        } else if (square.squareColor === 'white') {
          return <Square color="white" location={square.location} hasPiece={square.piece === null ? false : true} key={square.location.toString()}></Square>
        }
      }))}
    </div>
    }
    {game.player_one_id && game.player_one_id !== player.player_id && game.player_two_id && game.player_two_id !== player.player_id && <Redirect to={'/home'} /> }
    {/* {players.map(id => <div>Player {id}</div>)} */}
    </Container>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  player: SelectPlayer.data(state),
  game: SelectGame.data(state),
  currBoard: SelectCurrBoard.data(state),
  turn: SelectChangeTurn.data(state),
  setWinnerFetch: SelectSetWinner.status(state)
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getGame: (id) => dispatch(fetchGame(id)),
  getCurrBoard: (id) => dispatch(fetchCurrBoard(id)),
  changeTurn: (other_player_id, game_id) => dispatch(changeTurn(other_player_id, game_id)),
  setColors: (colorInfo, game_id) => dispatch(setColors(colorInfo, game_id)),
  resetSetWinner: () => dispatch(setWinnerReset()),
  setWinner: (id, winner_id) => dispatch(setWinner(id, winner_id)),
  resetCreateGame: () => dispatch(createGameReset()),
  resetAddSecondPlayer: () => dispatch(addSecondPlayerReset())

});
export default page("game")(connect(mapStateToProps, mapDispatchToProps)(Game));

const Container = styled.div`
display: flex;
width: 100%;
flex-direction: column;
align-items: center;
justify-content: center;

.board {
  height: 640px;
  width: 640px;
  display: flex;
  flex: direction: row;
  flex-wrap: wrap;
  border: 1px solid black;
}

.players-container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

button {
  ${buttonStyle};
}
`