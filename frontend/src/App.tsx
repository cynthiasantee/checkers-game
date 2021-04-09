import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./pages/Game"
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
// import { Socket } from './util/socket'

// Socket.echo.addEventListener('open', function (event) {
//   Socket.echo.send('Hello Server!');
// });

// Socket.echo.addEventListener('message', function (event) {
//   console.log('Message from server ', event.data);
// });

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/game/:id' component={Game}/>
        <PrivateRoute path='/home' component={Home}/>
        <Route path='/login' component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;