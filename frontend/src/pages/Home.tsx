import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { MyKnownError } from '../redux/util/myKnownError';
import { FetchStatus } from '../redux/util/fetchStatus';
import { AppDispatch, RootState } from '../redux/store';
import { connect } from 'react-redux';
import page from '../components/page';
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
import { createGame} from "../redux/thunk/createGameThunk";

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
}

interface DispatchProps {
  getPlayer: (id: number) => void;
  getPlayerWins: (id: number) => void;
  getPlayerTotalGames: (id: number) => void;
  createGame: (id: number) => void;
}

const Home = (props: StateProps & DispatchProps) => {
    const { id } = useParams<{ id: string }>();
    const { getPlayer, getPlayerWins, getPlayerTotalGames } = props;

  useEffect(() => {
    getPlayer(parseInt(id));
    getPlayerWins(parseInt(id));
    getPlayerTotalGames(parseInt(id));
  }, [id, getPlayer, getPlayerWins, getPlayerTotalGames]);

//   if (props.error === "400") {
//     return <Redirect to="/bad-request" />;
//   }

  if (!props.player) {
    return <></>;
  }

  return (
    <div>
      <p>Welcome, {props.player.email}!</p>
      <p>Wins: {props.playerWins || 0}</p>
      <p>Losses: {(props.playerTotalGames || 0) - (props.playerWins || 0)}</p>
      <button onClick={() => props.createGame(props.player?.id || 0)}>Start a new game?</button>

      {props.fetchStatusCreateGame === "success" && <Redirect to={`/game/${props.newGame?.new_game_id}`} /> }
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
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getPlayer: (id) => dispatch(fetchPlayer(id)),
  getPlayerWins: (id) => dispatch(fetchPlayerWins(id)),
  getPlayerTotalGames: (id) => dispatch(fetchPlayerTotalGames(id)),
  createGame: (id) => dispatch(createGame(id))
});

export default page("home")(connect(mapStateToProps, mapDispatchToProps)(Home));