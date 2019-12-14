import React from 'react';
import Table from './Core';
import Tablex from './Table';

const columns = [
  // {
  //   type: 'checkbox',
  // },
  {
    title: 'a',
    dataIndex: 'a',
    freezeWidth: true,
  },
  {
    title: 'b',
    dataIndex: 'b',
    width: 350,
  },
  {
    title: 'c',
    dataIndex: 'c',
    width: 350,
  },
  {
    title: 'e',
    dataIndex: 'e',
  },
  {
    title: 'f',
    dataIndex: 'f',
  },
  {
    title: 'g',
    dataIndex: 'g',
  },
  {
    title: 'h',
    dataIndex: 'h',
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
  return <Tablex columns={columns} dataSource={data} />;
}

export default App;
