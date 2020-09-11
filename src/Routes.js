import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import FetchingData from './FetchingData'
import Details from './Details'
import history from './history';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={FetchingData} />
        <Route exact path="/details/:id" component={Details} />
      </Switch>
    </Router>
  )
}

export default Routes;
