import { useMemo, useEffect, useRef, useState } from 'react';
import parseColumns, { ParsedData } from './utils/parseColumns';
import computeLayouts, { Layouts } from './utils/computeLayouts';
import { Column } from './Table';

export default function useLayouts(
  useTileLayout: boolean,
  columns: Column[],
  width?: number
): [React.MutableRefObject<HTMLDivElement | null>, ParsedData, Layouts] {
  const containerRef = useRef<HTMLDivElement>(null);

  // 预解析columns
  const meta = useMemo(() => parseColumns(columns), [columns]);

  // 根据解析后的数据计算布局
  const [layouts, setLayouts] = useState<Layouts>(() => ({
    colWidths: {},
    totalTableWidth: 0,
    mainTableWidth: 0,
    fixedLeftTableWidth: 0,
    fixedRightTableWidth: 0,
  }));

  useEffect(() => {
    if (
      !useTileLayout ||
      !containerRef.current ||
      typeof width !== 'undefined'
    ) {
      return;
    }

    const { allCols, colMinWidths } = meta;

    const _layouts: Layouts = computeLayouts(
      containerRef.current.clientWidth,
      allCols,
      colMinWidths
    );

    setLayouts(_layouts);
  }, [meta, useTileLayout, width]);

  const layoutsResult = useMemo(() => {
    if (typeof width !== 'undefined' && useTileLayout) {
      const { allCols, colMinWidths } = meta;

      const _layouts: Layouts = computeLayouts(width, allCols, colMinWidths);

      return _layouts;
    }

    return layouts;
  }, [layouts, meta, useTileLayout, width]);

  return [containerRef, meta, layoutsResult];
}
