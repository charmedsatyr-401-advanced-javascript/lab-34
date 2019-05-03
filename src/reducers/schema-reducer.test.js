import schema from './schema-reducer';

describe('schema reducer', () => {
  it('should GET', () => {
    // Again, this is about storing something retrieved
    // from a remote API in the cache
    const payload = { title: 'schema' };
    const action = { payload, type: 'GET-SCHEMA' };
    const result = schema(undefined, action);
    const expected = { cache: { schema: payload }, active: payload };
    expect(result).toMatchObject(expected);
  });
  it('should update its active schema', () => {
    const payload1 = { title: 'schema' };
    const action1 = { payload: payload1, type: 'GET-SCHEMA' };
    const setup1 = schema(undefined, action1);
    expect(setup1.active).toMatchObject(payload1);

    const payload2 = { title: 'wow' };
    const action2 = { payload: payload2, type: 'GET-SCHEMA' };
    const setup2 = schema(setup1, action2);
    expect(setup2.active).toMatchObject(payload2);

    const payload = 'schema';
    const action = { payload, type: 'UPDATE-ACTIVE-SCHEMA' };
    const result = schema(setup2, action);
    expect(result.active).toMatchObject(payload1);
  });
});
