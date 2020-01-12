import React from 'react';

/**
 * 渲染表格table
 * */
export default function renderTable(colGroup, tHead, tBody, style) {
  return (
    <table
      className="r-table"
      cellSpacing="0"
      cellPadding="0"
      border="0"
      style={style}
    >
      {colGroup}
      {tHead}
      {tBody}
    </table>
  );
}
