import React from 'react';
import './ComparisonPage.less';
import SearchPanel from './SearchPanel';
import ResultPanel from './ResultPanel';

export default function ComparisonPage() {
  return (
    <div className="comparison-page">
      <div className="wrapper">
        <SearchPanel />
        <ResultPanel />
      </div>
    </div>
  );
}
