const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  console.log('PAYLOAD:', payload, 'TYPE:', type);

  let index, newList, updatedRecord, record, updated;
  switch (type) {
    case 'GET-RECORDS':
      return Object.assign({}, state, { list: [...payload.results] });
    // Update a resource
    case 'PATCH-RECORD':
      index = state.list.findIndex(record => record._id === payload._id);
      record = state.list[index];
      newList = [...state.list];
      updatedRecord = Object.assign({}, record, payload);
      newList.splice(index, 1, updatedRecord);
      return Object.assign({ ...state, list: [...newList] });
    case 'POST-RECORD':
      return Object.assign({}, state, { list: [...state.list, payload] });
    case 'PUT-RECORD':
      index = state.list.findIndex(record => record._id === payload._id);
      record = state.list[index];
      newList = [...state.list];
      updatedRecord = payload; // Do not merge with PUT, only PATCH
      newList.splice(index, 1, updatedRecord);
      return Object.assign({ ...state, list: [...newList] });
    case 'DELETE-RECORD':
      updated = state.list.filter(record => record._id !== payload._id);
      return Object.assign({}, state, { list: updated });
    default:
      return state;
  }
};
