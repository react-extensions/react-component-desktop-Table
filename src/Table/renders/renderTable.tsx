import React from 'react';

/**
 * 渲染表格table
 * */
export default function renderTable(
  colGroup: React.ReactElement,
  tHead?: React.ReactElement,
  tBody?: React.ReactElement
) {
  return (
    <table className="r-table" cellSpacing="0" cellPadding="0">
      {colGroup}
      {tHead}
      {tBody}
    </table>
  );
}
