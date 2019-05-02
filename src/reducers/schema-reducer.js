const initialState = {
  cache: {},
  active: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  console.log('PAYLOAD:', payload, 'TYPE:', type);

  switch (type) {
    case 'GET-SCHEMA':
      const updatedCache = Object.assign({}, state.cache);
      updatedCache[payload.title] = payload;
      return Object.assign({}, state, { cache: updatedCache, active: payload });
    case 'UPDATE-ACTIVE-SCHEMA':
      return Object.assign({}, state, { active: state.cache[payload] });
    case 'PATCH-SCHEMA':
    case 'POST-SCHEMA':
    case 'PUT-SCHEMA':
    case 'DELETE-SCHEMA':
    default:
      return state;
  }
};
