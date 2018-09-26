const MAX_PERCENT = 75;

const initialState = {
  purchasePrice: 1000000,
  loanValue: 750000,
  showingPropertyTypes: false,
  isLoading: false,
  duration: 25,
  result: [],
  filter: {
    propertyType: 'HC',
    type: 'NEW',
    loanType: 'FLOAT',
  },
};

const SET_LOAN_FILTER = 'packageFilter/SetFilter';
const RESULT_LOAD_SUCCESSFULLY = 'packageFilter/ResultLoadSuccessfully';
const RESULT_LOAD_FAILED = 'packageFilter/ResultLoadFailed';
const SET_PURCHASE_PRICE = 'packageFilter/SetPurchasePrice';
const SET_LOAN_VALUE = 'packageFilter/SetLoanValue';
const TOGGLE_PROPERTY_TYPES = 'packageFilter/TogglePropertyTypes';
const SET_LOAN_DURATION = 'packageFilter/SetLoanDuration';

/**
 * the package filter reducer
 */
function packageFilterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOAN_FILTER: {
      const { filter } = action;

      return {
        ...state,
        isLoading: true,
        showingPropertyTypes: false,
        filter,
      };
    }

    case SET_LOAN_DURATION: {
      const { duration } = action;
      return {
        ...state,
        duration,
      };
    }

    case RESULT_LOAD_SUCCESSFULLY: {
      const { result } = action;

      return {
        ...state,
        isLoading: false,
        result,
      };
    }
    case RESULT_LOAD_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorMessage: 'Failed to get result for now. Please try again later.',
      };
    }
    case SET_PURCHASE_PRICE: {
      const { purchasePrice } = action;
      const oldPurchasePrice = state.purchasePrice;
      const percent = oldPurchasePrice === 0.0 ? 0.0 : (state.loanValue / oldPurchasePrice);
      const loanValue = percent * purchasePrice;
      
      return {
        ...state,
        loanValue,
        purchasePrice,
      };
    }

    case SET_LOAN_VALUE: {
      const { loanValue } = action;

      return {
        ...state,
        loanValue,
      };
    }

    case TOGGLE_PROPERTY_TYPES: {
      return {
        ...state,
        showingPropertyTypes: !state.showingPropertyTypes,
      };
    }
    default:
      return state;
  }
}

export default packageFilterReducer;

function convertToNumber(value) {
  let number = parseInt(value.replace(/,/g, ''), 10);

  if (Number.isNaN(number)) {
    number = 0;
  }

  return number;
}

export const packageFilterActionCreator = {
  load(filter = {}) {
    return async (dispatch, getState) => {
      const olderFilter = getState().packageFilter.filter;
      const newFilter = {
        ...olderFilter,
        ...filter,
      };

      dispatch({
        type: SET_LOAN_FILTER,
        filter: newFilter,
      });

      try {
        const response = await fetch(`/api/v1/packages?type=${encodeURIComponent(newFilter.type)}`
            + `&propertyType=${encodeURIComponent(newFilter.propertyType)}`
            + `&loanType=${newFilter.loanType}`);

        const result = await response.json();

        dispatch({
          type: RESULT_LOAD_SUCCESSFULLY,
          result,
        });
      } catch (e) {
        console.log('Error', e);
        dispatch({
          type: RESULT_LOAD_FAILED,
        });
      }
    };
  },
  setPurchasePrice(price) {
    const purchasePrice = convertToNumber(price);

    return {
      type: SET_PURCHASE_PRICE,
      purchasePrice,
    };
  },
  setLoanValue(value) {
    return (dispatch, getState) => {
      const state = getState();
      const loanValue = convertToNumber(value);
      const { purchasePrice } = state.packageFilter;
      const maxValue = purchasePrice * MAX_PERCENT / 100.0;

      dispatch({
        type: SET_LOAN_VALUE,
        loanValue: Math.min(loanValue, maxValue),
      });
    };
  },
  setLoanValuePercent(percentValue) {
    return (dispatch, getState) => {
      const state = getState();
      let percent = convertToNumber(percentValue);
      const { purchasePrice } = state.packageFilter;

      if (percentValue > MAX_PERCENT) {
        percent = MAX_PERCENT;
      }

      const loanValue = percent * purchasePrice / 100;

      dispatch({
        type: SET_LOAN_VALUE,
        loanValue,
      });
    };
  },
  togglePropertyTypes() {
    return {
      type: TOGGLE_PROPERTY_TYPES,
    };
  },
  setLoanDuration(durationValue) {
    let duration = parseInt(durationValue, 10);

    if (!(duration > 0)) {
      duration = 25;
    }

    return {
      type: SET_LOAN_DURATION,
      duration,
    };
  },
};
