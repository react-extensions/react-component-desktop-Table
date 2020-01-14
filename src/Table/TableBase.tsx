import React from 'react';
import useTableConfig from './useTableConfig';

interface TableBaseProps {
  colGroup: React.ReactElement;
  tHead?: React.ReactElement;
  tBody?: React.ReactElement;
}

const TableBase = ({ colGroup, tHead, tBody }: TableBaseProps) => {
  const { clsPrefix } = useTableConfig();
  return (
    <table className={`${clsPrefix}-table`} cellSpacing="0" cellPadding="0">
      {colGroup}
      {tHead}
      {tBody}
    </table>
  );
};

// TableBase.defaultProps = {};

export default React.memo(TableBase);
