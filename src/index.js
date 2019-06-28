import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React, { Fragment } from 'react';
import { store, history} from './store';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from './components/App';
import Notification from './components/Notification';


ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Fragment>
      <Notification />
      <Switch>
        <Route path="/" component={App} />
      </Switch>
      </Fragment>
    </ConnectedRouter>
  </Provider>

), document.getElementById('root'));
