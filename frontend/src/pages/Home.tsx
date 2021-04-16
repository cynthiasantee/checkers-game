import React, { useEffect, useState } from 'react';
import { FetchStatus } from '../redux/util/fetchStatus';
import page from './page';
import { Redirect } from "react-router-dom";
import { getSocket } from '../websocket';
import { homeButtonStyle } from "../styles/homeButtonStyle"
import styled from 'styled-components/macro';
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
import { SelectPlayerLosses } from '../redux/selector/getPlayerLossesSelector';
import { fetchPlayerLosses } from "../redux/thunk/getPlayerLossesThunk";
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
import logoTwo from '../logo/logoTwo.png'

interface StateProps {
  player?: Player;
  playerWins?: number;
  playerLosses?: number;
  newGame?: NewGameId;
  fetchStatusCreateGame: FetchStatus;
  allGames?: Game[];
  fetchStatusSecondPlayer: FetchStatus;
}

interface DispatchProps {
  getPlayerWins: (id: number) => void;
  getPlayerLosses: (id: number) => void;
  createGame: (id: number) => void;
  getGames: () => void;
  addSecondPlayer: (player: SecondPlayer, id: number) => void;
}

const Home = (props: StateProps & DispatchProps) => {
    const { getPlayerWins, getPlayerLosses, getGames, player } = props;
    const [userIds, setUserIds] = useState([] as string[]);
    const [newGame, setNewGame] = useState(true);

  useEffect(() => {
    getPlayerWins(player?.player_id || 0);
    getPlayerLosses(player?.player_id || 0);
  }, [ getPlayerWins, getPlayerLosses, player]);

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

  // if (props.error === "400") {
  //   return <Redirect to="/bad-request" />;
  // }

  if (!props.allGames || !player) {
    return <></>;
  }

  const openGames = props.allGames.filter(g => g.player_two_id === null && g.player_one_id !== player.player_id);
  const myGames = props.allGames.filter(g => (g.player_one_id === player.player_id || g.player_two_id === player.player_id) && g.player_two_id !== null && g.winner_id === null);
  const emptyGames = props.allGames.filter(g => g.player_one_id === player.player_id && g.player_two_id === null && g.winner_id === null)

  return (
    <Container>
      {/* <img src={logoTwo} alt="logo" /> */}
      <div className="player-info-outer">
        <span className="player-info-inner">
          <p>Welcome,</p>
          <p>{player.player_username}!</p>
        </span>
        <span className="player-info-inner">
          <p>Wins:</p>
          <p>{props.playerWins || 0}</p>
        </span>
        <span className="player-info-inner">
          <p>Losses:</p>
          <p>{props.playerLosses}</p>
        </span>
      </div>

      <button style={{backgroundColor: "#333333", borderColor: "#333333"}} onClick={() => props.createGame(props.player?.player_id || 0)}>Start a new game?</button>
      
      {((!myGames.length && !openGames.length) || (!openGames.length)) && <h3 style={{padding: "10px", textAlign: "center"}}>There are no new games for you to join at the moment</h3>}


      {!!openGames.length && <h3>Join?</h3>}
      
      {openGames.map(game => {
        const onGameClick = () => {
          setGameId(game.id);
          props.addSecondPlayer({player_two_id: player.player_id}, game.id);
        }
        return(
          <button onClick={onGameClick} key={game.id}>Game started by {game.player_one_username}</button>
        )
      })}

      {!!myGames.length && <h3>My ongoing games:</h3>}
      
      
      {myGames.map(game => {
        const onGameClick = () => {
          setGoToGame(game.id);
        }
        return(
          <button onClick={onGameClick} key={game.id}>Game against {game.player_one_id === player.player_id ? game.player_two_username : game.player_one_username}</button>
        )
      })}


      {!!emptyGames.length && <h3>Waiting for opponent:</h3>}
      
      {emptyGames.map((game, i) => {
        const onGameClick = () => {
          setGoToGame(game.id);
        }
        return(
          <button onClick={onGameClick} key={game.id}>My game #{i+1}</button>
        )
      })}

      {/* Users: {userIds.map(id => <div>User {id}</div>)}  */}
      {props.fetchStatusCreateGame === "success" && <Redirect to={`/game/${props.newGame?.new_game_id}`} /> }
      {props.fetchStatusSecondPlayer === "success" && <Redirect to={`/game/${gameId}`} /> }
      {goToGame && <Redirect to={`/game/${goToGame}`} />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  

  img {
    margin: 20px auto 20px 20px;
  }

  .player-info-outer{
    display: flex;
    width: 95%;
    max-width: 1500px;
    justify-content: space-around;
    border: 1px solid gray;
    background-color: #F0F0F0;
    border-radius: 5px;
    margin-bottom: 20px;
    margin-top: 20px;

    @media (max-width: 500px) {
      flex-direction: column;
    }
  }

  .player-info-inner{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2px;

    @media (max-width: 500px) {
      
      flex-direction: row;
    }

    p{
      margin: 5px;
      font-weight: bold;
      font-size: 20px;
    }
  }

  button {
    ${homeButtonStyle};
  }
`

const mapStateToProps = (state: RootState): StateProps => ({
  player: SelectPlayer.data(state),
  playerWins: SelectPlayerWins.data(state),
  playerLosses: SelectPlayerLosses.data(state),
  newGame: SelectCreateGame.data(state),
  fetchStatusCreateGame: SelectCreateGame.status(state),
  allGames: SelectGames.data(state),
  fetchStatusSecondPlayer: SelectAddSecondPlayer.status(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getPlayerWins: (id) => dispatch(fetchPlayerWins(id)),
  getPlayerLosses: (id) => dispatch(fetchPlayerLosses(id)),
  createGame: (id) => dispatch(createGame(id)),
  getGames: () => dispatch(fetchGames()),
  addSecondPlayer: (player, id) => dispatch(addSecondPlayer({player_two_id: player.player_two_id}, id))
});

export default page("home")(connect(mapStateToProps, mapDispatchToProps)(Home));