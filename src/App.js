import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import {BrowserRouter as Router,  Switch, Route } from 'react-router-dom';
import Search from './components/Search';
import Page404 from './components/Page404'


function App() {
  return (
      <div>
        <NavBar />
        <Router>
          <Switch>
            <Route exact path="/" component= { Home } />
            <Route path="/search" component= { Search }/>
            <Route component= { Page404 } />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
