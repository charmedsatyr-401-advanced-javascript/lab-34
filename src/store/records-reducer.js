import uuidv1 from 'uuid/v1';

export const dumbId = () => `${uuidv1().slice(0, 8)}${'0'.repeat(16)}`;

export const example = {
  name: 'Stu',
  position: 'C',
  throws: 'L',
  bats: 'L',
  team: 'Dodgers',
  _id: dumbId(),
  __v: 3,
};

const initialState = {
  list: [example],
  active: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  console.log('PAYLOAD:', payload, 'TYPE:', type);

  let index, newList, updatedRecord, record, updated;
  switch (type) {
    case 'GET':
      record = state.list.find(record => record._id === payload);
      return Object.assign({ ...state, active: record });
    // Update a resource
    case 'PATCH':
      index = state.list.findIndex(record => record._id === payload._id);
      record = state.list[index];
      newList = [...state.list];
      updatedRecord = Object.assign({}, record, payload);
      newList.splice(index, 1, updatedRecord);
      return Object.assign({ ...state, list: [...newList] });
    case 'POST':
      if (!payload._id) {
        payload._id = dumbId();
      }
      if (!payload.__v) {
        payload.__v = Math.floor(100 * Math.random());
      }
      return Object.assign({}, state, { list: [...state.list, payload] });
    // Replace a resource
    case 'PUT':
      index = state.list.findIndex(record => record._id === payload._id);
      record = state.list[index];
      newList = [...state.list];
      updatedRecord = Object.assign({}, record, payload);
      newList.splice(index, 1, updatedRecord);
      return Object.assign({ ...state, list: [...newList] });

    case 'DELETE':
      updated = state.list.filter((record, index) => record._id !== payload);
      return Object.assign({}, state, { list: updated });
    default:
      return state;
  }
};
