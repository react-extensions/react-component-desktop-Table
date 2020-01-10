import React from 'react';
import Table from './Table';

const columns = [
  {
    type: 'checkbox',
  },
  {
    title: 'a',
    colKey: 'a',
  },
  {
    title: 'b',
    colKey: 'b',
    width: 350,
  },
  {
    title: 'c',
    colKey: 'c',
    width: 350,
  },
  {
    title: 'e',
    colKey: 'e',
  },
  {
    title: 'f',
    colKey: 'f',
  },
  {
    title: 'g',
    colKey: 'g',
  },
  {
    title: 'h',
    colKey: 'h',
  },
];
const data = [
  {
    a: '123232',
    b: '123213',
    c: 'aasdfsdaf',
  },
];
for (let i = 0; i < 1000; i += 1) {
  data.push({
    a: i,
    b: '123213',
    c: 'aasdfsdaf',
  });
}
function App() {
  return <Table columns={columns} dataSource={data} />;
}

export default App;
