import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './SearchPanel.less';
import DropDownList from '../ui/DropDownList';
import TextField from '../ui/TextField';
import { packageFilterActionCreator } from '../../reducers/packageFilter';
import withLoader from '../common/connect';
import formatCurrency from '../common/format';
import CheckBox from '../ui/CheckBox';


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
}) {
  const loanTypes = ['FIXED', 'FLOAT'];
  let percent = purchasePrice !== 0 ? (100 * loanValue / purchasePrice) : 0;
  percent = parseInt(100 * percent, 10) / 100;

  return (
    <form className="search-panel">
      <h2>Personalize results</h2>
      <div className="loan-types">
        <a href="/purchase" className="active">
          Purchase
        </a>
        <a href="/purchase">
          Refinance
        </a>
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
      <div className="row">
        <div className="label">Purchase price</div>
        <TextField
          value={formatCurrency(purchasePrice)}
          onChange={setPurchasePrice}
        />
      </div>
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
      <div className="row">
        <div className="label">Tenure</div>
        <TextField
          symbol="Years"
          className="duration"
          value={duration.toString()}
          onChange={setLoanDuration}
        />
      </div>
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
    </form>
  );
}

SearchPanel.propTypes = {
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
};

SearchPanel.defaultProps = {
  propertyTypes: [],
};

function loadData({ load }) {
  load();
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
