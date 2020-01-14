import React from 'react';
import Row from './Row';
import { ParsedColumn } from './utils/parseColumns';

export interface RowDataSource {
  [prop: string]: any;
}

export interface TableBodyBaseProps {
  dataSource: RowDataSource[];
  columns: ParsedColumn[];
  rowKey: string;
}

const TableBodyBase = ({ columns, dataSource, rowKey }: TableBodyBaseProps) => {
  return (
    <tbody>
      {dataSource.map(data => {
        const key = data[rowKey];
        return <Row key={key} rowDataSource={data} columns={columns} />;
      })}
    </tbody>
  );
};

TableBodyBase.defaultProps = {};

export default React.memo(TableBodyBase);
