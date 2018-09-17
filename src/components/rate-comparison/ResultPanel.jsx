import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ResultPanel.less';
import formatCurrency, { formatDecimal } from '../common/format';

const YEARS = 3;

function calculteRates(rates, loanValue, duration) {
  const results = [];
  let principal = loanValue;
  const perYear = loanValue / duration;
  const perMonth = perYear / 12;

  for (let i = 0; i < YEARS; i += 1) {
    const rate = rates[i];
    const baseRate = (rate || {}).baseRate || {};
    const rateValue = (baseRate.value || 0.0) + rate.absoluteRate;
    const monthPay = perMonth + Math.round(principal * rateValue / 12 / 100.0);
    const yearPay = monthPay * 12;

    principal -= yearPay;

    results.push({
      rateValue,
      yearPay,
      monthPay,
    });
  }

  return results;
}

function renderRate(id, rate) {
  return (
    <div className="rate" key={id}>
      <div className="year-label">
        {['1ST', '2ND', '3RD'][id]}
        &nbsp;YEAR
      </div>
      <div className="interest number">
        {formatDecimal(rate.rateValue)}
        <sup>%</sup>
        <div className="description">
          Per annual
        </div>
      </div>
      <div className="monthly-payment number">
        <b>
          $
          {formatCurrency(rate.monthPay)}
        </b>
        <div className="description">
          Principal &amp; Interest
        </div>
      </div>
    </div>
  );
}

function renderItem(item, loanValue, duration) {
  const rates = calculteRates(item.rates, loanValue, duration);
  const total = rates.reduce((sum, rate) => sum + rate.yearPay, 0.0);

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
          {formatCurrency(total)}
          <div className="description">
            In total
          </div>
        </div>
        <a href="/apply" className="apply button">
          Apply
          <i className="fa fa-long-arrow-alt-right" />
        </a>
      </div>
    </div>
  );
}

function renderHeader() {
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
      <div className="total">
        Total
      </div>
    </div>
  );
}

function renderLoading() {
  return (
    <div className="loading">
      Loading...
    </div>
  );
}

function ResultPanel({
  isLoading,
  result,
  loanValue,
  duration,
}) {
  return isLoading ? renderLoading() : (
    <div className="result-panel">
      <h1>All Results</h1>
      {renderHeader()}
      {result.map(item => renderItem(item, loanValue, duration))}
      <div className="footer">
        Displaying
        {result.length}
        results
      </div>
    </div>
  );
}

ResultPanel.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  result: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loanValue: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};


export default connect(
  appState => ({
    ...appState.packageFilter,
  }),
)(ResultPanel);
