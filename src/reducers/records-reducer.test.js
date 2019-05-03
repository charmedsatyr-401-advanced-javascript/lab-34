import players from './records-reducer';

describe('players reducer', () => {
  const example = {
    name: 'Stu',
    position: 'C',
    throws: 'L',
    bats: 'L',
    team: 'Dodgers',
    _id: 1111,
    __v: 3,
  };

  const mickey = {
    name: 'Mickey',
    position: 'C',
    throws: 'L',
    bats: 'L',
    team: 'Dodgers',
    _id: 2222,
    __v: 4,
  };
  it('should POST', () => {
    const action = { payload: mickey, type: 'POST-RECORD' };
    const result = players(undefined, action);
    expect(result.list).toEqual(expect.arrayContaining([mickey]));
  });
  it('should GET', () => {
    // The naming is a little confusing: GET performs a GET
    // on the remote API and then populates the local store
    // with the results
    const payload = { results: [example] };
    const get = { payload, type: 'GET-RECORDS' };
    const result = players(undefined, get);
    const expected = [example];
    expect(result.list).toEqual(expected);
  });
  it('should PATCH', () => {
    const mikey = Object.assign({}, mickey, { name: 'Mikey' });
    const action = { payload: mikey, type: 'PATCH-RECORD' };
    const result = players(undefined, action);
    expect(result.list).toEqual(expect.arrayContaining([mikey]));
    expect(result.list).not.toEqual(expect.arrayContaining([mickey]));
  });
  it('should PUT', () => {
    const mikey = Object.assign({}, mickey, { name: 'Mikey' });
    const action = { payload: mikey, type: 'PUT-RECORD' };
    const result = players(undefined, action);
    expect(result.list).toEqual(expect.arrayContaining([mikey]));
    expect(result.list).not.toEqual(expect.arrayContaining([mickey]));
  });
  it('should DELETE', () => {
    const action = { payload: 1, type: 'DELETE-RECORD' };
    const result = players(undefined, action);
    expect(result.list).not.toEqual(expect.arrayContaining([mickey]));
  });
});
