import getUrl from '../lib/api-server-url';

// Right now we just get all records and display them
export const get = model => dispatch => {
  const url = getUrl(model).get;
  fetch(url)
    .then(data => data.json())
    .then(records => {
      console.log('GET response:', records);
      dispatch(getRecordsSync(records));
    });
};

export const destroy = (payload, model) => dispatch => {
  const url = getUrl(model, payload._id).delete;

  const options = {
    method: 'DELETE',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  };
  fetch(url, options)
    .then(data => data.json())
    .then(record => {
      console.log('DELETE response:', record);
      dispatch(destroyRecordSync(record));
    })
    .catch(console.error);
};

export const post = (payload, model) => dispatch => {
  const url = getUrl(model).post;

  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  };
  fetch(url, options)
    .then(data => data.json())
    .then(record => {
      console.log('POST response:', record);
      dispatch(postRecordSync(record));
    })
    .catch(console.error);
};

// NOTE: The current back end does not support PATCH, just PUT
export const patch = (payload, model) => dispatch => {
  const url = getUrl(model, payload._id).patch;
  console.log('url:', url);
  console.log('payload:', payload);

  const options = {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  };
  fetch(url, options)
    .then(data => data.json())
    .then(record => {
      console.log('PATCH response:', record);
      dispatch(patchRecordSync(record));
    })
    .catch(console.error);
};

export const put = (payload, model) => dispatch => {
  const url = getUrl(model, payload._id).put;
  console.log('url:', url);
  console.log('payload:', payload);

  const options = {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  };
  fetch(url, options)
    .then(data => data.json())
    .then(record => {
      console.log('PUT response:', record);
      dispatch(patchRecordSync(record));
    })
    .catch(console.error);
};

export const getRecordsSync = payload => ({ payload, type: 'GET-RECORDS' });
export const patchRecordSync = payload => ({ payload, type: 'PATCH-RECORD' });
export const postRecordSync = payload => ({ payload, type: 'POST-RECORD' });
export const putRecordSync = payload => ({ payload, type: 'PUT-RECORD' });
export const destroyRecordSync = payload => ({ payload, type: 'DELETE-RECORD' });
