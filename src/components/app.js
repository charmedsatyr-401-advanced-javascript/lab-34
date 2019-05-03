import React from 'react';

import SetSchema from './set-schema';
import NewRecord from './new-record';
import Records from './records';

import './app.scss';

const App = () => (
  <>
    <SetSchema />
    <NewRecord />
    <Records />
  </>
);

export default App;
