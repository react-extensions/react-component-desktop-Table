import React from 'react';

/**
 * 渲染 tobody
 * */
export default function renderTBody(columns, data, startIndex, tType) {
  const { state, props } = this;
  const isBottom = tType === 'bottom';
  const isNormal = tType === 'normal';
  const hasData = props.rows.length > 0;

  return (
    <tbody>
      {hasData ? (
        data.map((rowData, i) => {
          const index = i + startIndex;
          const customerProps = this.beforeRowMount(rowData, index);
          const key = /*! props.rowKey ? index : */ rowData[props.rowKey];
          // console.log(startIndex)

          return (
            <Row
              {...customerProps}
              key={i}
              rowKey={key}
              rowIndex={isBottom ? `b-${index}` : index}
              rowData={rowData}
              columns={columns}
              isBottom={isBottom}
              needSync={this.HAS_FIXED}
              isFixed={!isNormal && !isBottom}
              // 样式
              bgColor={
                props.zebra && (index % 2 === 0 ? '_lighten' : '_darken')
              }
              // check
              checkState={this.checkState} // 表格 多选 还是单选
              checkStatus={state.checkStatus}
              onChecked={this.handleRowChecked}
              rowSelection={props.rowSelection}
              // 同步状态
              syncRowMap={this.syncRowMap}
              // 计算布局
              onRowMount={this.onRowMount}
            />
          );
        })
      ) : isNormal ? (
        <tr>
          <td colSpan={columns.length} className="r-table-empty-tip-wrap">
            {props.emptyTip || (
              <div className="r-table-empty-tip">暂无数据</div>
            )}
            )}
          </td>
        </tr>
      ) : null}
    </tbody>
  );
}
