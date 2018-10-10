import getBanks from '../components/services/bankService';

const MAX_PERCENT = 75;

const initialState = {
  purchasePrice: 1000000,
  loanValue: 750000,
  showingPropertyTypes: false,
  showingLockInTypes: false,
  showingBanks: false,
  isLoading: false,
  duration: 25,
  result: [],
  banks: [],
  currentBank: 'UOB',
  interests: [
    2.8,
    2.8,
    2.8,
  ],
  showFilter: true,
  filter: {
    propertyType: 'HC',
    type: 'NEW',
    loanType: 'FLOAT',
    lockIn: null,
  },
};

const SET_LOAN_FILTER = 'packageFilter/SetFilter';
const RESULT_LOAD_SUCCESSFULLY = 'packageFilter/ResultLoadSuccessfully';
const RESULT_LOAD_FAILED = 'packageFilter/ResultLoadFailed';
const SET_PURCHASE_PRICE = 'packageFilter/SetPurchasePrice';
const SET_LOAN_VALUE = 'packageFilter/SetLoanValue';
const TOGGLE_PROPERTY_TYPES = 'packageFilter/TogglePropertyTypes';
const SET_LOAN_DURATION = 'packageFilter/SetLoanDuration';
const SET_INTEREST_RATE = 'packageFilter/SetInterestRate';
const TOGGLE_FILTER = 'packageFilter/toggleFilter';
const TOGGLE_SHOW_LOCK_IN_TYPES = 'packageFilter/ToggleShowLockInTypes';
const TOGGLE_SHOW_BANKS = 'packageFilter/ToggleShowBanks';
const LOAD_BANKS = 'packageFilter/setBanks';
const SET_CURRENT_BANK = 'packageFilter/setCurrentBank';

/**
 * the package filter reducer
 */
function packageFilterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INTEREST_RATE: {
      const { id, interestRate } = action;
      const { interests } = state;

      return {
        ...state,
        interests: interests.map((value, index) => (index === id ? interestRate : value)),
      };
    }
    case SET_LOAN_FILTER: {
      const { filter } = action;

      return {
        ...state,
        showingLockInTypes: false,
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

    case TOGGLE_SHOW_BANKS: {
      return {
        ...state,
        showingBanks: !state.showingBanks,
      };
    }
    case TOGGLE_FILTER: {
      return {
        ...state,
        showFilter: !state.showFilter,
      };
    }

    case TOGGLE_SHOW_LOCK_IN_TYPES: {
      return {
        ...state,
        showingLockInTypes: !state.showingLockInTypes,
      };
    }

    case LOAD_BANKS: {
      return {
        ...state,
        banks: action.banks,
      };
    }

    case SET_CURRENT_BANK: {
      return {
        ...state,
        currentBank: action.bank,
        showingBanks: false,
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
      let { banks } = getState();

      if (!banks || !banks.length) {
        banks = await getBanks();
        dispatch({
          type: LOAD_BANKS,
          banks,
        });
      }

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
        let endpoint = `/api/v1/packages?type=${encodeURIComponent(newFilter.type)}`
          + `&propertyType=${encodeURIComponent(newFilter.propertyType)}`
          + `&loanType=${newFilter.loanType}`;

        if (newFilter.lockIn) {
          endpoint += `&lockIn=${newFilter.lockIn}`;
        }

        const response = await fetch(endpoint);


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
      const { type } = state.packageFilter.filter;
      const { purchasePrice } = state.packageFilter;
      const maxValue = type === 'NEW' ? purchasePrice * MAX_PERCENT / 100.0 : 100000000;

      dispatch({
        type: SET_LOAN_VALUE,
        loanValue: Math.min(loanValue, maxValue),
      });
    };
  },
  setInterestRate(id, interestRate) {
    return {
      type: SET_INTEREST_RATE,
      id,
      interestRate,
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
  toggleBanks() {
    return {
      type: TOGGLE_SHOW_BANKS,
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
  toggleFilter() {
    return {
      type: TOGGLE_FILTER,
    };
  },
  toggleShowLockInTypes() {
    return {
      type: TOGGLE_SHOW_LOCK_IN_TYPES,
    };
  },
  setCurrentBank(bank) {
    return {
      type: SET_CURRENT_BANK,
      bank,
    };
  },
};
