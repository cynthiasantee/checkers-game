import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { MyKnownError } from '../redux/util/myKnownError';
import { FetchStatus } from '../redux/util/fetchStatus';
import { AppDispatch, RootState } from '../redux/store';
import { connect } from 'react-redux';
import page from './page';
import { useParams, Redirect } from "react-router-dom";
//Player info
import { Player } from '../redux/api/getPlayerApi';
import { SelectPlayer } from '../redux/selector/getPlayerSelector';
import { fetchPlayer } from "../redux/thunk/getPlayerThunk";
//Player wins
import { SelectPlayerWins } from '../redux/selector/getPlayerWinsSelector';
import { fetchPlayerWins } from "../redux/thunk/getPlayerWinsThunk";
//Player total games
import { SelectPlayerTotalGames } from '../redux/selector/getPlayerTotalGamesSelector';
import { fetchPlayerTotalGames } from "../redux/thunk/getPlayerTotalGamesThunk";
//Create game
import { NewGameId } from '../redux/api/createGameApi';
import { SelectCreateGame } from '../redux/selector/createGameSelector';
import { createGame } from "../redux/thunk/createGameThunk";
import { Game } from '../redux/api/getGameApi';
//All games
import { SelectGames } from '../redux/selector/getGamesSelector';
import {fetchGames } from "../redux/thunk/getGamesThunk";
//Add second player
import { SelectAddSecondPlayer } from '../redux/selector/addSecondPlayerSelector';
import { addSecondPlayer } from "../redux/thunk/addSecondPlayerThunk";
import { SecondPlayer } from '../redux/api/addSecondPlayerApi';
import { setMyId } from '../redux/reducer/myId';


interface StateProps {
  //myId
  myId: number | null;
  //player
  player?: Player;
  errorPlayer?: MyKnownError;
  fetchStatusPlayer: FetchStatus;
//Player wins
  playerWins?: number;
  errorPlayerWins?: MyKnownError;
  fetchStatusPlayerWins: FetchStatus;
//Player total games
  playerTotalGames?: number;
  errorPlayerTotalGames?: MyKnownError;
  fetchStatusPlayerTotalGames: FetchStatus;
  //Create game
  newGame?: NewGameId;
  errorCreateGame?: MyKnownError;
  fetchStatusCreateGame: FetchStatus;
  //All games
  allGames?: Game[];
  errorAllGames?: MyKnownError;
  fetchStatusAllGames: FetchStatus;
  //Add second player
  secondPlayer?: SecondPlayer;
  errorSecondPlayer?: MyKnownError;
  fetchStatusSecondPlayer: FetchStatus;
}

interface DispatchProps {
  getPlayer: (id: number) => void;
  getPlayerWins: (id: number) => void;
  getPlayerTotalGames: (id: number) => void;
  createGame: (id: number) => void;
  getGames: () => void;
  addSecondPlayer: (player: SecondPlayer, id: number) => void;
  setMyId: (id: number) => void;
}

const Home = (props: StateProps & DispatchProps) => {
    const { id } = useParams<{ id: string }>();
    const { getPlayer, getPlayerWins, getPlayerTotalGames, getGames, setMyId } = props;

  useEffect(() => {
    getPlayer(parseInt(id));
    getPlayerWins(parseInt(id));
    getPlayerTotalGames(parseInt(id));
    getGames();
    setMyId(parseInt(id));
  }, [id, getPlayer, getPlayerWins, getPlayerTotalGames, getGames, setMyId]);

  const [gameId, setGameId] = useState(undefined as undefined | number);
  const [goToGame, setGoToGame] = useState(undefined as undefined | number);

//   if (props.error === "400") {
//     return <Redirect to="/bad-request" />;
//   }

  if (!props.player || !props.allGames) {
    return <></>;
  }

  const player = props.player;

  const openGames = props.allGames.filter(g => g.player_two_id === null && g.player_one_id !== player.id);
  const myGames = props.allGames.filter(g => (g.player_one_id === player.id || g.player_two_id === player.id) && g.player_two_id !== null && g.winner_id === null);
  const emptyGames = props.allGames.filter(g => g.player_one_id === player.id && g.player_two_id === null && g.winner_id === null)

  return (
    <div>
      <p>Welcomes, {props.player.username}!</p>
      <p>Wins: {props.playerWins || 0}</p>
      <p>Losses: {(props.playerTotalGames || 0) - (props.playerWins || 0)}</p>
      <button onClick={() => props.createGame(props.player?.id || 0)}>Start a new game?</button>
      <p>Open Games:{openGames.map(game => {
        
        const onGameClick = () => {
          setGameId(game.id);
          props.addSecondPlayer({player_two_id: parseInt(id)}, game.id);
        }

        return(
          <button onClick={onGameClick}>Game started by {game.player_one_username}</button>
        )
      })}</p>

      <p>My Games:{myGames.map(game => {
        
        const onGameClick = () => {
          setGoToGame(game.id);
        }

        return(
          <button onClick={onGameClick}>Game against {game.player_one_id === parseInt(id) ? game.player_two_username : game.player_one_username}</button>
        )
      })}</p>

      <p>My Empty Games:{emptyGames.map((game, i) => {
        
        const onGameClick = () => {
          setGoToGame(game.id);
        }

        return(
          <button onClick={onGameClick}>My game {i+1}</button>
        )
      })}</p>

      {props.fetchStatusCreateGame === "success" && <Redirect to={`/game/${props.newGame?.new_game_id}`} /> }
      {props.fetchStatusSecondPlayer === "success" && <Redirect to={`/game/${gameId}`} /> }
      {goToGame && <Redirect to={`/game/${goToGame}`} />}
    </div>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  //my Id
  myId: state.myId,
  //Player info
  player: SelectPlayer.data(state),
  errorPlayer: SelectPlayer.error(state),
  fetchStatusPlayer: SelectPlayer.status(state),
  //Player wins
  playerWins: SelectPlayerWins.data(state),
  errorPlayerWins: SelectPlayerWins.error(state),
  fetchStatusPlayerWins: SelectPlayerWins.status(state),
  //Player total games
  playerTotalGames: SelectPlayerTotalGames.data(state),
  errorPlayerTotalGames: SelectPlayerTotalGames.error(state),
  fetchStatusPlayerTotalGames: SelectPlayerTotalGames.status(state),
  //Create game
  newGame: SelectCreateGame.data(state),
  errorCreateGame: SelectCreateGame.error(state),
  fetchStatusCreateGame: SelectCreateGame.status(state),
  //All games
  allGames: SelectGames.data(state),
  errorAllGames: SelectGames.error(state),
  fetchStatusAllGames: SelectGames.status(state),
  //Add second player
  secondPlayer: SelectAddSecondPlayer.data(state),
  errorSecondPlayer: SelectAddSecondPlayer.error(state),
  fetchStatusSecondPlayer: SelectAddSecondPlayer.status(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  setMyId: (id) => dispatch(setMyId(id)),
  getPlayer: (id) => dispatch(fetchPlayer(id)),
  getPlayerWins: (id) => dispatch(fetchPlayerWins(id)),
  getPlayerTotalGames: (id) => dispatch(fetchPlayerTotalGames(id)),
  createGame: (id) => dispatch(createGame(id)),
  getGames: () => dispatch(fetchGames()),
  addSecondPlayer: (player, id) => dispatch(addSecondPlayer({player_two_id: player.player_two_id}, id))
});

export default page("home")(connect(mapStateToProps, mapDispatchToProps)(Home));