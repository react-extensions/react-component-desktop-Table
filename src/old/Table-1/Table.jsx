/* eslint-disable no-underscore-dangle */
import React, { useCallback, useRef, useEffect } from 'react';
import propTypes from 'prop-types';
import Row from './Row';
import getPrefixCls from './utils/getPrefixClassName';

const Table = React.memo(function Table({ columns, dataSource }) {
  // container el 的引用
  const containerRef = useRef();
  // 保存column的宽度
  const colMinWidthsRef = useRef(new Map());
  // cell加载，获取宽度
  const onCellMounted = useCallback(
    el => {
      if (!el) {
        return;
      }
      const colMinWidths = colMinWidthsRef.current;
      colMinWidths[el.dataset.key] = el.offsetWidth;
      if (colMinWidths.size !== columns.length) {
        // 还没完全渲染完成
        return;
      }
    },
    [columns]
  );

  /**
   * 布局算法。
   *
   * 调用条件：
   * 1. 容器宽度改变
   * 2. props.columns改变
   * 3. 平铺或拉伸布局改变
   *
   * 前置数据：
   * 1. 用户设置宽度
   * 2. 用户设置禁止扩展宽度
   * 3. 表头最小宽度
   * 4. 容器宽度
   * 5. 平铺或拉伸布局
   *
   * 布局计算规则：
   * 0. 拉伸布局: 所有列总宽度等于容器宽度
   * 0. 平铺布局： 所有列总宽度不小于容器宽度
   * 0. 最小列宽：等于列表头横向完全展示的宽度
   * 0. 列宽总宽度: 用户设置宽度加上最小列宽
   * 0. 禁止扩展宽度：平铺布局时优先级最高，但是在拉伸布局中无效
   * 1. 禁止扩展宽度时，若用户自定义了列宽，则列宽为自定义宽度，不允许修改
   * 2. 禁止扩展宽度时，若用户未设置列宽，列宽为最小列宽，不允许修改
   * 3. 当列总宽度小于容器宽度时，除了**禁止扩展列宽**列，其它列平分多余宽度
   * 4. 拉伸布局中，如果**列宽总宽度**大于容器宽度，优先缩小未设宽度的列宽
   * 5. 当计算后的列宽小于 20px，给出警告
   * 6. 如果自定义列宽小于最小列宽，如果设置了**禁止扩展列宽**，则使用自定义列宽，否则使用最小列宽
   *
   *
   * */
  const computeColWidth = useCallback(() => {
    if (!containerRef.current) {
      return;
    }
    const colMinWidths = colMinWidthsRef.current;
    const containerLayoutWidth = containerRef.current.clientWidth;
    const totalColsWidth = columns.reduce(
      (result, { width, colKey }) => result + (width || colMinWidths[colKey]),
      0
    );
    // 如果表格 容器宽度 大于 自定义总宽   diff > 0
    const widthDiff = containerLayoutWidth - totalColsWidth;
    const columnWidths = columns.map(({ width, disabledFlex, colKey }) => {
      const minWidth = colMinWidths[colKey];
      
    });
  }, [columns]);

  useEffect(() => {
    computeColWidth();
  }, [computeColWidth]);

  return (
    <div className={getPrefixCls('table-container')} ref={containerRef}>
      <div className={getPrefixCls('table')}>
        <div className={getPrefixCls('table-head-track')}>
          <div className={getPrefixCls('table-head')}>
            <div className={getPrefixCls('table-tr')}>
              {columns.map(({ title, colKey }) => (
                <div className={getPrefixCls('table-th')} key={colKey}>
                  <span
                    className={getPrefixCls('table-cell')}
                    ref={onCellMounted}
                    data-key={colKey}
                  >
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={getPrefixCls('table-body-track')}>
          <div className={getPrefixCls('table-body')}>
            {dataSource.map(data => (
              <Row key={data.id} data={data} columns={columns} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

Table.defaultProps = {
  columns: [],
  dataSource: {},
};
Table.propTypes = {
  columns: propTypes.arrayOf(
    propTypes.shape({
      title: propTypes.string,
      colKey: propTypes.string,
    })
  ),
  dataSource: propTypes.arrayOf(propTypes.object),
};

export default Table;
