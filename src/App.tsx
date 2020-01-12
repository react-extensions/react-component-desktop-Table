import React from 'react';
import Table from './Table';
import { Column } from './Table/Table';

const columns: Column[] = [
  {
    type: 'checkbox',
  },
  {
    title: 'a',
  },
  {
    title: 'b',
    width: 350,
  },
  {
    title: 'c',
    width: 350,
  },
  {
    title: 'e',
  },
  {
    title: 'f',
  },
  {
    title: 'g',
  },
  {
    title: 'h',
  },
];
const data = [
  {
    a: 123232,
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

const App: React.FC = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default App;
