import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import App from '../App';
import { CodeDemo } from '../views/demo';

export const RouteConfig = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/demo" component={CodeDemo} />
      </Switch>
    </Router>
  );
}