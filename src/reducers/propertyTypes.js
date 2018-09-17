const initialState = {
  propertyTypes: [
    {
      id: 'HC',
      name: 'HDB Completed',
    },
    {
      id: 'PC',
      name: 'Private Completed',
    },
    {
      id: 'HUC',
      name: 'HDB Under Construction',
    },
    {
      id: 'PUC',
      name: 'Private Under Construction',
    },
  ],
};

function propertyTypeReducer(state = initialState) {
  return state;
}

export default propertyTypeReducer;
