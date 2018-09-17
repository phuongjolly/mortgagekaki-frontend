import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import NavBar from './components/layout/NavBar';
import './index.less';
import Ads from './components/layout/Ads';
import ComparisonPage from './components/rate-comparison/ComparisonPage';
import store from './stores/store';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <NavBar />
        <Ads />
        <ComparisonPage />
      </div>
    </Provider>
  );
}

const targetElement = document.getElementById('root');
render(<App />, targetElement);
