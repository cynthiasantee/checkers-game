import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./pages/Game"
import Home from './pages/Home';
import Entry from './pages/Entry';
import PrivateRoute from './pages/PrivateRoute';
import NavBar from './components/Nav'
import ResetPassword from './pages/ResetPassword';
import BadRequest from './pages/BadRequest';


const App: React.FC = () => {
  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <PrivateRoute path='/game/:id' component={Game}/>
        <PrivateRoute path='/home' component={Home}/>
        <Route path='/reset-password' component={ResetPassword}/>
        <Route path='/bad-request' component={BadRequest}/>
        <Route path='/' isExact={true} component={Entry}/>
      </Switch>
    </Router>
  );
}

export default App;