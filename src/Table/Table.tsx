/* eslint-disable react/jsx-filename-extension */
import React, {
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from 'react';
import classnames from 'classnames';
// import Row from './Row';
import SCROLL_BAR_WIDTH from './utils/getScrollBarWidth';
import useColumnsParse from './hooks/useColumnsParse';
import getColumnMinWidths, { ColMinWidths } from './utils/getColumnMinWidths';

export type Align = 'left' | 'right' | 'center';

export type LayoutMode = 'tile' | 'stretch';

export type ColumnType = 'checkbox' | 'radio' | 'expand';

export type ColumnFixed = 'left' | 'right';

export interface Column {
  title: string;
  dataIndex: string;
  render: () => void;
  type: ColumnType;
  width: number;
  fixed: ColumnFixed;
  cannotExpand: boolean;
}

interface ColumnWidths {
  [key: string]: number;
}

export interface TableProps {
  dataSource: {}[];
  columns: Column[];
  className: string;
  align: Align;
  layoutMode: LayoutMode;
  rowKey: string;
  useSplitLayout: boolean;
  dragAble: boolean;
  loading: boolean;
}

const Table = function Table(props: TableProps) {
  const {
    rows,
    columns,
    databaseSort,
    className,
    align,
    layoutMode,
    dragAble,
    loading,
    rowSelection,
    tableHeight,
    useSplitLayout,
  } = props;
  const containerRef: React.MutableRefObject<HTMLDivElement> = useRef();
  const [complete, setComplete] = useState(false);
  const [layouts, setLayouts] = useState(null);

  /* computed props */

  // 表格类名
  const _className = useMemo(
    () =>
      classnames(
        'r-table-container',
        className,
        `_align-${align}`,
        `_${layoutMode}`,
        !complete && '_un-complete'
      ),
    [align, className, complete, layoutMode]
  );

  const meta = useColumnsParse(columns);
  // 使用平铺布局
  // TODO: 是否第一次确定后，以后不可更改
  const useTileLayout = meta.hasFixed || dragAble || layoutMode === 'tile';
  // 使用分体式布局
  const _useSplitLayout = meta.hasFixed || !!tableHeight || useSplitLayout;
  // 最小列宽
  const colMinWidths: ColMinWidths = useMemo(
    () => getColumnMinWidths(meta.allCols),
    [meta.allCols]
  );
  /**
   * 根据用户设置,计算表格列宽 及 总宽度
   * */
  const computeLayout = useCallback(() => {
    const { allCols } = meta;
    const containerWidth =
      containerRef.current.clientWidth - /* this.scrollBarY */ 17;
    let totalColsWidth = 0;
    let cannotExpandTotalWidth = 0;

    // - 将maxColWidthList所有值相加，得出总宽度（计算总宽度）
    // - 将不允许扩展宽度的列的宽度相加
    allCols.forEach(col => {
      const { width = 0, cannotExpand } = col;
      if (cannotExpand) {
        // TODO ?如果没设置
        cannotExpandTotalWidth += width;
      }
      totalColsWidth += width;
    }); // END

    const colWidths: ColumnWidths = {};
    // 如果表格 物理宽度 大于 计算宽度   diff > 0
    const diff = containerWidth - totalColsWidth;
    let mainTableWidth = 0;
    let fixedLeftTableWidth = 0;
    let fixedRightTableWidth = 0;

    allCols.forEach(({ __key, fixed, cannotExpand }) => {
      const minWidth = colMinWidths[__key];
      let _result = minWidth || 0;

      if (diff > 0 && !cannotExpand) {
        // 除了不允许扩展的列, 其他均匀分配多出的位置
        const rate = minWidth / (totalColsWidth - cannotExpandTotalWidth);
        const increment = diff * rate;
        _result = minWidth + increment;
        if (_result < minWidth) {
          // 最终结果不能小于 最小宽度
          _result = minWidth;
        }
      }

      if (fixed === 'left') {
        fixedLeftTableWidth += _result;
      } else if (fixed === 'right') {
        fixedRightTableWidth += _result;
      } else {
        mainTableWidth += _result;
      }
      colWidths[__key] = _result;
    }); // End forEach

    const totalTableWidth =
      fixedLeftTableWidth + fixedRightTableWidth + mainTableWidth;

    return {
      totalTableWidth,
      fixedLeftTableWidth,
      fixedRightTableWidth,
      mainTableWidth,
      colWidths,
    };
  }, [colMinWidths, meta]);

  useEffect(() => {
    const _layouts = computeLayout();
    setLayouts(_layouts);
    console.log('_layouts', _layouts);
    // TODO
    // this.scrollBarX =
    //   containerWidth - totalTableWidth < Number.EPSILON ? SCROLL_BAR_WIDTH : 0;
    setComplete(true);
  }, [computeLayout]);

  const renderTable = useCallback(() => {
    return (
      <>
        {renderTable(
          renderColumns.call(this, columns.plain),
          renderTHead.call(this, columns.plain),
          renderTBody.call(this, columns.plain, rows, 'normal')
        )}
        {/* 普通表格 */}
        {/* {useSplitLayout
          ? renderSplitLayoutTable.call(this, columns.plain, rows)
          : renderTable(
              renderColumns.call(this, columns.plain),
              renderTHead.call(this, columns.plain),
              renderTBody.call(this, columns.plain, rows, 'normal')
            )} */}
        {/* 左固定表格 */}
        {/* {hasLeft && renderLeftTable.call(this, columns.left, rows)} */}
        {/* 右固定表格 */}
        {/* {hasRight && renderRightTable.call(this, columns.right, rows)} */}
        {/* {hasBottom && renderBottomTable()} */}
      </>
    );
  }, []);

  return (
    <div className={_className} ref={containerRef}>
      {renderTable()}
    </div>
  );
};

Table.defaultProps = {
  dataSources: [],
  className: undefined,
  layoutMode: 'stretch',
  useSplitLayout: false,
};

export default React.memo(Table);
