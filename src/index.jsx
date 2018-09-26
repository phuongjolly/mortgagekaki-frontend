import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import './index.less';
import Ads from './components/layout/Ads';
import ComparisonPage from './components/rate-comparison/ComparisonPage';
import store from './stores/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <div className="app">
          <NavBar />
          <Ads />
          <Switch>
            <Route path="/search/:type" component={ComparisonPage} />
            <Redirect to="/search/purchase" />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

const targetElement = document.getElementById('root');
render(<App />, targetElement);
