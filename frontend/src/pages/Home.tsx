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
import { PlayerOne, NewGameId } from '../redux/api/createGameApi';
import { SelectCreateGame } from '../redux/selector/createGameSelector';
import { createGame } from "../redux/thunk/createGameThunk";
import { Game } from '../redux/api/getGameApi';
//Open games
import { SelectOpenGames } from '../redux/selector/getOpenGamesSelector';
import { fetchOpenGames } from "../redux/thunk/getOpenGamesThunk";
//Curr games
import { SelectMyCurrGames } from '../redux/selector/getMyCurrGamesSelector';
import { fetchMyCurrGames } from "../redux/thunk/getMyCurrGamesThunk";
//Empty games
import { SelectEmptyGames } from '../redux/selector/getEmptyGamesSelector';
import { fetchEmptyGames } from "../redux/thunk/getEmptyGamesThunk";
//Add second player
import { SelectAddSecondPlayer } from '../redux/selector/addSecondPlayerSelector';
import { addSecondPlayer } from "../redux/thunk/addSecondPlayerThunk";
import { SecondPlayer } from '../redux/api/addSecondPlayerApi';


interface StateProps {
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
  //Open games
  openGames?: Game[];
  errorOpenGames?: MyKnownError;
  fetchStatusOpenGames: FetchStatus;
  //Curr games
  myCurrGames?: Game[];
  errorMyCurrGames?: MyKnownError;
  fetchStatusMyCurrGames: FetchStatus;
  //Empty games
  emptyGames?: Game[];
  errorEmptyGames?: MyKnownError;
  fetchStatusEmptyGames: FetchStatus;
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
  getOpenGames: (myId: number) => void;
  getMyCurrGames: (myId: number) => void;
  getEmptyGames: (myId: number) => void;
  addSecondPlayer: (player: SecondPlayer, id: number) => void;
}

const Home = (props: StateProps & DispatchProps) => {
    const { id } = useParams<{ id: string }>();
    const { getPlayer, getPlayerWins, getPlayerTotalGames,getOpenGames, getMyCurrGames, getEmptyGames } = props;

  useEffect(() => {
    getPlayer(parseInt(id));
    getPlayerWins(parseInt(id));
    getPlayerTotalGames(parseInt(id));
    getOpenGames(parseInt(id));
    getMyCurrGames(parseInt(id));
    getEmptyGames(parseInt(id));
  }, [id, getPlayer, getPlayerWins, getPlayerTotalGames, getOpenGames, getMyCurrGames, getEmptyGames]);

  const [gameId, setGameId] = useState(undefined as undefined | number);
  const [goToGame, setGoToGame] = useState(undefined as undefined | number);

//   if (props.error === "400") {
//     return <Redirect to="/bad-request" />;
//   }

  if (!props.player || !props.openGames || !props.myCurrGames || !props.emptyGames) {
    return <></>;
  }

  return (
    <div>
      <p>Welcome, {props.player.email}!</p>
      <p>Wins: {props.playerWins || 0}</p>
      <p>Losses: {(props.playerTotalGames || 0) - (props.playerWins || 0)}</p>
      <button onClick={() => props.createGame(props.player?.id || 0)}>Start a new game?</button>
      <p>Open Games:{props.openGames.map(game => {
        
        const onGameClick = () => {
          setGameId(game.id);
          props.addSecondPlayer({player_two_id: parseInt(id)}, game.id);
        }

        return(
          <button onClick={onGameClick}>Game started by {game.player_one_id}</button>
        )
      })}</p>

      <p>My Games:{props.myCurrGames.map(game => {
        
        const onGameClick = () => {
          setGoToGame(game.id);
        }

        return(
          <button onClick={onGameClick}>Game against {game.player_one_id === parseInt(id) ? game.player_two_id : game.player_one_id}</button>
        )
      })}</p>

      <p>My Empty Games:{props.emptyGames.map((game, i) => {
        
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
  //Open games
  openGames: SelectOpenGames.data(state),
  errorOpenGames: SelectOpenGames.error(state),
  fetchStatusOpenGames: SelectOpenGames.status(state),
  //Curr games
  myCurrGames: SelectMyCurrGames.data(state),
  errorMyCurrGames: SelectMyCurrGames.error(state),
  fetchStatusMyCurrGames: SelectMyCurrGames.status(state),
  //Curr games
  emptyGames: SelectEmptyGames.data(state),
  errorEmptyGames: SelectEmptyGames.error(state),
  fetchStatusEmptyGames: SelectEmptyGames.status(state),
  //Add second player
  secondPlayer: SelectAddSecondPlayer.data(state),
  errorSecondPlayer: SelectAddSecondPlayer.error(state),
  fetchStatusSecondPlayer: SelectAddSecondPlayer.status(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getPlayer: (id) => dispatch(fetchPlayer(id)),
  getPlayerWins: (id) => dispatch(fetchPlayerWins(id)),
  getPlayerTotalGames: (id) => dispatch(fetchPlayerTotalGames(id)),
  createGame: (id) => dispatch(createGame(id)),
  getOpenGames: (myId) => dispatch(fetchOpenGames(myId)),
  getMyCurrGames: (myId) => dispatch(fetchMyCurrGames(myId)),
  getEmptyGames: (myId) => dispatch(fetchEmptyGames(myId)),
  addSecondPlayer: (player, id) => dispatch(addSecondPlayer({player_two_id: player.player_two_id}, id))
});

export default page("home")(connect(mapStateToProps, mapDispatchToProps)(Home));