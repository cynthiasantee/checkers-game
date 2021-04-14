import React, { useEffect, useState } from 'react';
import { FetchStatus } from '../redux/util/fetchStatus';
import page from './page';
import { Redirect } from "react-router-dom";
import { getSocket } from '../websocket';
//Redux
import { AppDispatch, RootState } from '../redux/store';
import { connect } from 'react-redux';
//Player info
import { Player } from '../redux/api/getPlayerApi';
import { SelectPlayer } from '../redux/selector/getPlayerSelector';
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

interface StateProps {
  player?: Player;
  playerWins?: number;
  playerTotalGames?: number;
  newGame?: NewGameId;
  fetchStatusCreateGame: FetchStatus;
  allGames?: Game[];
  fetchStatusSecondPlayer: FetchStatus;
}

interface DispatchProps {
  getPlayerWins: (id: number) => void;
  getPlayerTotalGames: (id: number) => void;
  createGame: (id: number) => void;
  getGames: () => void;
  addSecondPlayer: (player: SecondPlayer, id: number) => void;
}

const Home = (props: StateProps & DispatchProps) => {
    const { getPlayerWins, getPlayerTotalGames, getGames, player } = props;
    const [userIds, setUserIds] = useState([] as string[]);
    const [newGame, setNewGame] = useState(true);

  useEffect(() => {
    getPlayerWins(player?.player_id || 0);
    getPlayerTotalGames(player?.player_id || 0);
  }, [ getPlayerWins, getPlayerTotalGames, player]);

  useEffect(() => {
    if (newGame) {
      getGames();
      setNewGame(false);
    }
  }, [newGame]);

  useEffect(() => {
    const socket = getSocket('home');
    
    socket.on("users", ids => {
        setUserIds(ids);
    })

    socket.on("game_created", () => {
      setNewGame(true);
  })

  socket.on("game_entered", () => {
    setNewGame(true);
})

    return () => {
        socket.disconnect();
    }
  },[]);

  const [gameId, setGameId] = useState(undefined as undefined | number);
  const [goToGame, setGoToGame] = useState(undefined as undefined | number);

//   if (props.error === "400") {
//     return <Redirect to="/bad-request" />;
//   }

  if (!props.allGames || !player) {
    return <></>;
  }

  const openGames = props.allGames.filter(g => g.player_two_id === null && g.player_one_id !== player.player_id);
  const myGames = props.allGames.filter(g => (g.player_one_id === player.player_id || g.player_two_id === player.player_id) && g.player_two_id !== null && g.winner_id === null);
  const emptyGames = props.allGames.filter(g => g.player_one_id === player.player_id && g.player_two_id === null && g.winner_id === null)

  return (
    <div>
      <p>Welcome, {player.player_username}!</p>
      <p>Wins: {props.playerWins || 0}</p>
      <p>Losses: {(props.playerTotalGames || 0) - (props.playerWins || 0)}</p>
      <button onClick={() => props.createGame(props.player?.player_id || 0)}>Start a new game?</button>
      
      <p>Open Games:{openGames.map(game => {
        const onGameClick = () => {
          setGameId(game.id);
          props.addSecondPlayer({player_two_id: player.player_id}, game.id);
        }
        return(
          <button onClick={onGameClick} key={game.id}>Game started by {game.player_one_username}</button>
        )
      })}</p>

      <p>My Games:{myGames.map(game => {
        const onGameClick = () => {
          setGoToGame(game.id);
        }
        return(
          <button onClick={onGameClick} key={game.id}>Game against {game.player_one_id === player.player_id ? game.player_two_username : game.player_one_username}</button>
        )
      })}</p>

      <p>My Empty Games:{emptyGames.map((game, i) => {
        const onGameClick = () => {
          setGoToGame(game.id);
        }
        return(
          <button onClick={onGameClick} key={game.id}>My game {i+1}</button>
        )
      })}</p>


      Users: {userIds.map(id => <div>User {id}</div>)} 
      {props.fetchStatusCreateGame === "success" && <Redirect to={`/game/${props.newGame?.new_game_id}`} /> }
      {props.fetchStatusSecondPlayer === "success" && <Redirect to={`/game/${gameId}`} /> }
      {goToGame && <Redirect to={`/game/${goToGame}`} />}
    </div>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  player: SelectPlayer.data(state),
  playerWins: SelectPlayerWins.data(state),
  playerTotalGames: SelectPlayerTotalGames.data(state),
  newGame: SelectCreateGame.data(state),
  fetchStatusCreateGame: SelectCreateGame.status(state),
  allGames: SelectGames.data(state),
  fetchStatusSecondPlayer: SelectAddSecondPlayer.status(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getPlayerWins: (id) => dispatch(fetchPlayerWins(id)),
  getPlayerTotalGames: (id) => dispatch(fetchPlayerTotalGames(id)),
  createGame: (id) => dispatch(createGame(id)),
  getGames: () => dispatch(fetchGames()),
  addSecondPlayer: (player, id) => dispatch(addSecondPlayer({player_two_id: player.player_two_id}, id))
});

export default page("home")(connect(mapStateToProps, mapDispatchToProps)(Home));