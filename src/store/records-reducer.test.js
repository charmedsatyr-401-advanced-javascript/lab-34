import players, { example, dumbId } from './records-reducer';

describe('players reducer', () => {
  const mickey = {
    name: 'Mickey',
    position: 'C',
    throws: 'L',
    bats: 'L',
    team: 'Dodgers',
    _id: dumbId(),
    __v: 4,
  };
  it('should POST', () => {
    const action = { payload: mickey, type: 'POST' };
    const result = players(undefined, action);
    expect(result.list).toEqual(expect.arrayContaining([mickey]));
  });
  it('should GET', () => {
    const action = { payload: example._id, type: 'GET' };
    const result = players(undefined, action);
    expect(result.active).toMatchObject(example);
  });
  it('should PATCH', () => {
    const mikey = Object.assign({}, mickey, { name: 'Mikey' });
    const action = { payload: mikey, type: 'PATCH' };
    const result = players(undefined, action);
    expect(result.list).toEqual(expect.arrayContaining([mikey]));
    expect(result.list).not.toEqual(expect.arrayContaining([mickey]));
  });
  it('should PUT', () => {
    const mikey = Object.assign({}, mickey, { name: 'Mikey' });
    const action = { payload: mikey, type: 'PUT' };
    const result = players(undefined, action);
    expect(result.list).toEqual(expect.arrayContaining([mikey]));
    expect(result.list).not.toEqual(expect.arrayContaining([mickey]));
  });
  it('should DELETE', () => {
    const action = { payload: 1, type: 'DELETE' };
    const result = players(undefined, action);
    expect(result.list).not.toEqual(expect.arrayContaining([mickey]));
  });
});
