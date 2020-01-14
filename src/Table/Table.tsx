import React, { useMemo } from 'react';
import classnames from 'classnames';
import TableBase from './TableBase';
import TableHeader from './TableHeader';
import ColGroup from './ColGroup';
import useLayouts from './useLayouts';
import TableBodyBase, { RowDataSource } from './TableBodyBase';
import useTableConfig from './useTableConfig';
import './style.less';

export type Align = 'left' | 'right' | 'center';

export type LayoutMode = 'tile' | 'stretch';

export type ColumnType = 'checkbox' | 'radio' | 'expand';

export type ColumnFixed = 'left' | 'right';

export interface Column {
  title?: string;
  dataIndex?: string;
  render?: () => void;
  type?: ColumnType;
  width?: number;
  fixed?: ColumnFixed;
  cannotExpand?: boolean;
  className?: string;
}

export interface TableProps {
  /* 布局 */
  align?: Align;
  columns: Column[];
  dragAble?: boolean;
  width?: number;
  height?: number;
  layoutMode?: LayoutMode;
  useSplitLayout?: boolean;

  /* 其它 */
  className?: string;
  dataSource: RowDataSource[];
  rowKey: string;
  loading?: boolean;
}

const Table = (props: TableProps) => {
  const {
    align,
    columns,
    dragAble,
    width,
    layoutMode,
    useSplitLayout,

    /*  */
    className,
    dataSource,
    rowKey,
  } = props;
  const [containerRef, meta, layouts] = useLayouts(
    useTileLayout,
    columns,
    width
  );
  const { fixedLeftCols, fixedRightCols } = meta;

  const hasLeft = fixedLeftCols.length > 0;

  const hasRight = fixedRightCols.length > 0;

  const hasFixed = hasLeft || hasRight;

  // 使用平铺布局
  // TODO: 是否第一次确定后，以后不可更改
  const useTileLayout = hasFixed || dragAble || layoutMode === 'tile';

  // 使用分体式布局
  const _useSplitLayout = hasFixed /* || !!tableHeight */ || useSplitLayout;

  const { clsPrefix } = useTableConfig();

  // 表格类名
  const _className = useMemo(
    () => classnames(`${clsPrefix}-table-container`, className),
    [className, clsPrefix]
  );

  const render = () => {
    if (!_useSplitLayout) {
      const colGroup = (
        <ColGroup columns={meta.mainCols} colWidths={layouts.colWidths} />
      );

      const tHead = <TableHeader columns={meta.mainCols} />;

      const tBody = (
        <TableBodyBase
          columns={meta.mainCols}
          dataSource={dataSource}
          rowKey={rowKey}
        />
      );

      return <TableBase colGroup={colGroup} tHead={tHead} tBody={tBody} />;
    }

    return null;
  };

  return (
    <div className={_className} ref={containerRef}>
      {render()}
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
