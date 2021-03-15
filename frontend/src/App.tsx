import React from 'react';
import styled from 'styled-components/macro';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./pages/Game"
import Home from './pages/Home';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/game/:id' component={Game}/>
        <Route path='/home/:id' component={Home}/>
        <Route path='/login' component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;