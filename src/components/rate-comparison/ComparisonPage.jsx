import React from 'react';
import PropTypes from 'prop-types';
import './ComparisonPage.less';
import SearchPanel from './SearchPanel';
import ResultPanel from './ResultPanel';

export default function ComparisonPage({ match }) {
  const { type } = match.params;
  return (
    <div className="comparison-page">
      <div className="wrapper">
        <SearchPanel type={type} />
        <ResultPanel />
      </div>
    </div>
  );
}

ComparisonPage.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
