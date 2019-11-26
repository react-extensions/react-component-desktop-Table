import React from 'react';
import Table from './Core';

const columns = [
  {
    title: 'a',
    prop: 'a',
  },
  {
    title: 'b',
    prop: 'b',
  },
  {
    title: 'c',
    prop: 'c',
  },
];
const data = [
  {
    a: '123232',
    b: '123213',
    c: 'aasdfsdaf',
  },
];
function App() {
  return <Table columns={columns} rows={data} />;
}

export default App;
