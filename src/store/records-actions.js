export const destroy = payload => ({ payload, type: 'DELETE' });
export const get = payload => ({ payload, type: 'GET' });
export const patch = payload => ({ payload, type: 'PATCH' });
export const post = payload => ({ payload, type: 'POST' });
export const put = payload => ({ payload, type: 'PUT' });
