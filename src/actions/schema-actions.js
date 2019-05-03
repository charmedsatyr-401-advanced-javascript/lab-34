import getUrl from '../lib/api-server-url';

export const getSchema = model => dispatch => {
  const url = getUrl(model).schema;
  fetch(url)
    .then(data => data.json())
    .then(newSchema => {
      console.log('SCHEMA:', newSchema);
      const schema = newSchema;
      dispatch(getSchemaSync(schema));
    });
};

export const getSchemaSync = payload => ({ payload, type: 'GET-SCHEMA' });
export const updateActiveSchema = payload => ({ payload, type: 'UPDATE-ACTIVE-SCHEMA' });
