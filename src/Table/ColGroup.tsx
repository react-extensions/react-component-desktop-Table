import React from 'react';
import { ParsedColumn } from './utils/parseColumns';
import { ColumnWidths } from './utils/computeLayouts';
import { ColMinWidths } from './utils/computeColumnMinWidths';

interface ColGroupProps {
  columns: ParsedColumn[];
  colMinWidths: ColMinWidths;
  colWidths: ColumnWidths;
}

function ColGroup({ columns, colMinWidths, colWidths }: ColGroupProps) {
  if (!columns.length) {
    return null;
  }
  return (
    <colgroup>
      {columns.map(({ __key }) => (
        <col
          key={__key}
          style={{
            minWidth: colMinWidths[__key],
            width: colWidths[__key],
          }}
        />
      ))}
    </colgroup>
  );
}

export default React.memo(ColGroup);
