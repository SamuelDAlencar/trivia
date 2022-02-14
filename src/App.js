import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './components/Settings';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Settings } />
    </Switch>
  );
}
