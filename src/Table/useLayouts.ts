import { useMemo, useEffect, useRef, useState } from 'react';
import computeLayouts, { Layouts } from './utils/computeLayouts';
import { ParsedColumn } from './useColumnsParser';
import { ColMinWidths } from './utils/computeColumnMinWidths';
import ColGroup from './ColGroup';

export default function useLayouts(
  allCols: ParsedColumn[],
  colMinWidths: ColMinWidths,
  useTileLayout: boolean,
  width?: number
): [React.MutableRefObject<HTMLDivElement | null>, Layouts] {
  const containerRef = useRef<HTMLDivElement>(null);

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

    const _layouts: Layouts = computeLayouts(
      containerRef.current.clientWidth,
      allCols,
      colMinWidths
    );
    console.log('useEffect, _layouts', _layouts);

    setLayouts(_layouts);
  }, [allCols, colMinWidths, useTileLayout, width]);

  const layoutsResult = useMemo(() => {
    if (typeof width !== 'undefined' && useTileLayout) {
      const _layouts: Layouts = computeLayouts(width, allCols, colMinWidths);
      console.log('memo, _layouts', _layouts);
      return _layouts;
    }

    return layouts;
  }, [allCols, colMinWidths, layouts, useTileLayout, width]);

  return [containerRef, layoutsResult];
}
