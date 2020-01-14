import React from 'react';
import { RowDataSource } from './TableBodyBase';
import { ParsedColumn } from './utils/parseColumns';
import useTableConfig from './useTableConfig';

interface TableRowProps {
  rowDataSource: RowDataSource;
  columns: ParsedColumn[];
}

const TableRow = ({ rowDataSource, columns }: TableRowProps) => {
  const { clsPrefix } = useTableConfig();

  return (
    <tr>
      {columns.map(({ dataIndex }) => {
        if (!dataIndex) {
          return (
            <td className={`${clsPrefix}-td`} key={dataIndex} title={''}>
              <span className={`${clsPrefix}-td-content`}>''</span>
            </td>
          );
        }
        const value = rowDataSource[dataIndex];
        return (
          <td className={`${clsPrefix}-td`} key={dataIndex} title={value}>
            <span className={`${clsPrefix}-td-content`}>{value}</span>
          </td>
        );
      })}
    </tr>
  );
};

TableRow.defaultProps = {};

export default React.memo(TableRow);
