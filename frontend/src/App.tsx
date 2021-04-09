import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./pages/Game"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './pages/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/game/:id' component={Game}/>
        <PrivateRoute path='/home' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/' isExact={true} component={Register}/>
      </Switch>
    </Router>
  );
}

export default App;