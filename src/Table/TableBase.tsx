import React from 'react';
import useTableConfig from './useTableConfig';

interface TableBaseProps {
  colGroup: React.ReactNode;
  tHead?: React.ReactNode;
  tBody?: React.ReactNode;
  style?: {
    [prop: string]: any;
  };
}

const TableBase = ({ colGroup, tHead, tBody, style }: TableBaseProps) => {
  const { clsPrefix } = useTableConfig();
  return (
    <table
      className={`${clsPrefix}-table`}
      cellSpacing="0"
      cellPadding="0"
      style={style}
    >
      {colGroup}
      {tHead}
      {tBody}
    </table>
  );
};

// TableBase.defaultProps = {};

export default React.memo(TableBase);
