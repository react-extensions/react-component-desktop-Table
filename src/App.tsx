import React, { useRef } from 'react';
import Table from './Table';
import { Column } from './Table/Table';

const columns: Column[] = [
  {
    title: 'one',
    dataIndex: 'one',
  },
  {
    title: 'two',
    width: 350,
    dataIndex: 'b',
  },
  {
    title: 'three',
    width: 350,
    dataIndex: 'c',
  },
  {
    title: 'four',
  },
  {
    title: 'five',
  },
  {
    title: 'six',
  },
  {
    title: 'seven',
  },
];
const data = [
  {
    one: '第一行，第一列',
    b: '第一行，第二列',
    c: '第一行，第三列',
  },
];
for (let i = 0; i < 100; i += 1) {
  data.push({
    one: String(i),
    b: '你哈搜集回复的萨芬理解；乐山大佛案说法啥都',
    c: 'aasdfsdafsfdafsadfsdafsadfasfasd dfsfsafsd',
  });
}

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref}>
      <Table columns={columns} dataSource={data} rowKey="a" useSplitLayout />
    </div>
  );
};

export default App;
