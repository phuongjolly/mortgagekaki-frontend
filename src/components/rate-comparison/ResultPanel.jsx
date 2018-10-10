import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';

import './ResultPanel.less';
import formatCurrency, { formatDecimal } from '../common/format';
import calculateLoans, { calculateInterest } from '../services/loanService';
import { packageFilterActionCreator } from '../../reducers/packageFilter';

const REFINANCE = 'refinance';

function renderRate(id, rate) {
  return (
    <div className="rate" key={id}>
      <div className="year-label">
        {['1ST', '2ND', '3RD'][id]}
        &nbsp;YEAR
      </div>
      <div className="interest number">
        {formatDecimal(rate.rate)}
        <sup>%</sup>
        <div className="description">
          Per annum
        </div>
      </div>
      <div className="monthly-payment number">
        <b>
          $
          {formatCurrency(rate.monthlyBalance)}
        </b>
        <div className="description">
          Instalment
        </div>
      </div>
    </div>
  );
}

function renderItem(item, type) {
  const { rates } = item;

  return (
    <div key={item.id} className="rate-display">
      <div className="info">
        <div className="bank-info">
          <div className="bank-logo">
            <img src={`/bank-logos/${item.bank.id}.PNG`} alt={item.bank.id} />
          </div>
        </div>
        <div className="rates">
          {[0, 1, 2].map(year => renderRate(year, rates[year]))}
        </div>
      </div>
      <div className="summary">
        <div className="interest number">
          <sup>$</sup>
          {formatCurrency(item.totalInterest)}
          <div className="description">
            {type === REFINANCE ? 'total savings' : 'total interest'}
          </div>
        </div>
        <Link to={`/search/apply/${item.id}`} className="apply button">
          Apply
          <i className="fa fa-long-arrow-alt-right" />
        </Link>
      </div>
    </div>
  );
}

function renderHeader(type) {
  return (
    <div className="header">
      <div className="bank-name">
        Bank
      </div>
      <div className="years">
        <div className="year">
          First year
        </div>
        <div className="year">
          Second year
        </div>
        <div className="year">
          Third year
        </div>
      </div>
      {type === REFINANCE ? <div className="total">Total Savings</div>
        : (
          <div className="total">
            Interest for
            {' '}
            <span>3</span>
            {' '}
            Years
          </div>
        )}
    </div>
  );
}

function renderLoading(type, color) {
  return (
    <div className="loading">
      <ReactLoading type={type} color={color} height={50} width={50} />
    </div>
  );
}

function ResultPanel({
  isLoading,
  result,
  loanValue,
  duration,
  toggleFilter,
  interests,
  type,
  currentBank,
}) {
  let data = calculateLoans(loanValue, duration, result);

  if (type === REFINANCE) {
    const currentLoan = calculateInterest(loanValue, duration, interests);
    data = data.map(item => ({
      ...item,
      totalInterest: currentLoan.totalInterest - item.totalInterest,
    })).filter(
      item => item.totalInterest > 0 && item.bank.id !== currentBank,
    );

    data.sort((a, b) => b.totalInterest - a.totalInterest);
  } else {
    data.sort((a, b) => a.totalInterest - b.totalInterest);
  }

  return isLoading ? renderLoading('spinningBubbles', '#20cb7e') : (
    <div className="result-panel">
      <div className="all-result-header">
        <h1>All Results</h1>
        <div
          role="presentation"
          className="customize button"
          onClick={toggleFilter}
        >
          Customize
          <i className="fa fa-sliders-h" />
        </div>
      </div>
      {renderHeader(type)}
      {data.map(item => renderItem(item, type))}
      {data.length > 0 ? (
        <div className="footer">
          Displaying
          {' '}
          {result.length}
          {' '}
          results
        </div>
      ) : (
        <div className="empty-state">
          {type === REFINANCE
            ? 'Thank you for your enquiry. Currently, there is no better package than the one you are having.\nYou can choose to remain with current bank package.'
            : 'There is no result for your enquiry at the moment'}
        </div>
      )}
    </div>
  );
}

ResultPanel.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  result: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loanValue: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  interests: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentBank: PropTypes.string.isRequired,
};


export default connect(
  appState => ({
    ...appState.packageFilter,
  }),
  packageFilterActionCreator,
)(ResultPanel);
