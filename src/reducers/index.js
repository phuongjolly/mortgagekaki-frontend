import packageFilterReducer from './packageFilter';
import propertyTypeReducer from './propertyTypes';
import applicationReducer from './application';

const reducers = {
  packageFilter: packageFilterReducer,
  propertyTypes: propertyTypeReducer,
  application: applicationReducer,
};

export default reducers;
