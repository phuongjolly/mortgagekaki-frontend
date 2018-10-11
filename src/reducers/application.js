import enquiry from '../components/services/enquiryService';

const initialState = {
  name: '',
  email: '',
  mobile: '',
  isLoading: false,
  isSuccessful: false,
  errorMessage: null,
};

const UPDATE = 'application/update';
const APPLY = 'application/apply';
const APPLY_SUCCESSFUL = 'application/apply/successful';
const APPLY_FAILED = 'application/apply/failed';
const RESET_STATE = 'packageFilter/SetFilter';

export default function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE: {
      return {
        ...state,
        isSuccessful: false,
        isLoading: false,
        [action.field]: action.value,
      };
    }
    case APPLY: {
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    }
    case APPLY_SUCCESSFUL: {
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
      };
    }
    case APPLY_FAILED: {
      return {
        ...state,
        isLoading: false,
        isSuccessful: false,
        errorMessage: 'Something wrong. Please try again.',
      };
    }
    case RESET_STATE: {
      return {
        ...state,
        isLoading: false,
        isSuccessful: false,
        errorMessage: null,
      };
    }
    default: {
      return state;
    }
  }
}

export const applicationActionCreator = {
  resetState() {
    return {
      type: RESET_STATE,
    };
  },
  update(field, value) {
    return {
      type: UPDATE,
      field,
      value,
    };
  },
  apply(packageId) {
    return async (dispatch, getState) => {
      dispatch({ type: APPLY });

      const state = getState();
      try {
        await enquiry(packageId, state);

        dispatch({
          type: APPLY_SUCCESSFUL,
        });
      } catch (error) {
        console.log(error);

        dispatch({
          type: APPLY_FAILED,
        });
      }
    };
  },
};
