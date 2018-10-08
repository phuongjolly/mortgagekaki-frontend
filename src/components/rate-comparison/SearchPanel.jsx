import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './SearchPanel.less';
import DropDownList from '../ui/DropDownList';
import TextField from '../ui/TextField';
import { packageFilterActionCreator } from '../../reducers/packageFilter';
import withLoader from '../common/connect';
import formatCurrency from '../common/format';
import CheckBox from '../ui/CheckBox';

const PURCHASE = 'purchase';
const INTEREST_TEXT = [
  'This Year\'s Interest Rate',
  'Next year\'s Interest Rate',
  'Following year\'s Interest Rate',
];

function renderInterest(
  id,
  interest,
  setInterestRate,
) {
  console.log('render interest');
  return (
    <div key={id} className="row">
      <div className="label">{INTEREST_TEXT[id]}</div>
      <TextField
        value={`${interest}`}
        symbol="%"
        className="duration"
        onChange={value => setInterestRate(id, value)}
      />
    </div>
  );
}

function SearchPanel({
  propertyTypes,
  loanValue,
  purchasePrice,
  duration,
  showingPropertyTypes,
  togglePropertyTypes,
  setPurchasePrice,
  setLoanValue,
  setLoanValuePercent,
  setLoanDuration,
  filter,
  load,
  type,
  interests,
  setInterestRate,
  showFilter,
  toggleFilter,
}) {
  const loanTypes = ['FIXED', 'FLOAT'];
  let percent = purchasePrice !== 0 ? (100 * loanValue / purchasePrice) : 0;
  percent = parseInt(100 * percent, 10) / 100;
  const isNew = type === PURCHASE;

  return (
    <form className={`search-panel ${showFilter && 'show-filter'}`}>
      <h2>Personalize results</h2>
      <div className="loan-types">
        <NavLink to="/search/purchase" activeClassName="active">
          Purchase
        </NavLink>
        <NavLink to="/search/refinance" activeClassName="active">
          Refinance
        </NavLink>
      </div>
      <div className="row">
        <div className="label">Property Type</div>
        <DropDownList
          items={propertyTypes}
          showing={showingPropertyTypes}
          toggle={togglePropertyTypes}
          selectedItem={filter.propertyType}
          onSelect={propertyType => load({ propertyType })}
        />
      </div>
      {isNew && (
        <div className="row">
          <div className="label">Purchase price</div>
          <TextField
            value={formatCurrency(purchasePrice)}
            onChange={setPurchasePrice}
          />
        </div>
      )}
      {isNew ? (
        <div className="row">
          <div className="label">Loan Value</div>
          <div className="two columns">
            <TextField
              value={formatCurrency(loanValue)}
              className="purchase-price"
              onChange={setLoanValue}
            />
            <TextField
              value={formatCurrency(percent)}
              className="purchase-price-percent"
              symbol="%"
              onChange={setLoanValuePercent}
            />
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="label">Outstanding Balance</div>
          <TextField
            value={formatCurrency(loanValue)}
            onChange={setLoanValue}
          />
        </div>
      )}
      <div className="row">
        <div className="label">{isNew ? 'Tenure' : 'Remaining Tenure'}</div>
        <TextField
          symbol="Years"
          className="duration"
          value={duration.toString()}
          onChange={setLoanDuration}
        />
      </div>
      {!isNew && (
        interests.map((interest, index) => renderInterest(index, interest, setInterestRate))
      )}
      <div className="row">
        <div className="label">Prefered Loan Type</div>
        {loanTypes.map(item => (
          <CheckBox
            key={item}
            checked={filter.loanType === item}
            onSelect={() => load({
              loanType: item,
            })}
          >
            {item}
          </CheckBox>
        ))}
      </div>
      <div className="row">
        <div
          role="presentation"
          onClick={toggleFilter}
          className="button apply-button"
        >
          Apply
        </div>
      </div>
    </form>
  );
}

SearchPanel.propTypes = {
  type: PropTypes.string.isRequired,
  propertyTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  filter: PropTypes.shape({
  }).isRequired,
  loanValue: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  purchasePrice: PropTypes.number.isRequired,
  setPurchasePrice: PropTypes.func.isRequired,
  setLoanValue: PropTypes.func.isRequired,
  setLoanValuePercent: PropTypes.func.isRequired,
  showingPropertyTypes: PropTypes.bool.isRequired,
  togglePropertyTypes: PropTypes.func.isRequired,
  setLoanDuration: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  interests: PropTypes.arrayOf(PropTypes.any).isRequired,
  setInterestRate: PropTypes.func.isRequired,
  showFilter: PropTypes.bool.isRequired,
  toggleFilter: PropTypes.func.isRequired,
};

SearchPanel.defaultProps = {
  propertyTypes: [],
};

function loadData({
  load,
  type,
  filter,
  isLoading,
  result,
}) {
  if (!isLoading) {
    if (result.length === 0) {
      load({
        type: type === PURCHASE ? 'NEW' : 'BOTH',
      });
    } else if (type === PURCHASE) {
      if (filter.type !== 'NEW') {
        load({
          type: 'NEW',
        });
      }
    } else if (filter.type !== 'BOTH') {
      load({
        type: 'BOTH',
      });
    }
  }
}

export default connect(
  appState => ({
    propertyTypes: appState.propertyTypes.propertyTypes,
    ...appState.packageFilter,
  }),
  {
    ...packageFilterActionCreator,
  },
)(
  withLoader(SearchPanel, loadData),
);
