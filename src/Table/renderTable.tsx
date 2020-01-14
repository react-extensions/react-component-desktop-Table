import React from 'react';
import { TableConfig } from './context';

/**
 * 渲染表格table
 * */
export default function renderTable(
  tableConfig: TableConfig,
  colGroup: React.ReactElement,
  tHead?: React.ReactElement,
  tBody?: React.ReactElement
) {
  return (
    <table className={`${tableConfig.clsPrefix}-table`} cellSpacing="0" cellPadding="0">
      {colGroup}
      {tHead}
      {tBody}
    </table>
  );
}
