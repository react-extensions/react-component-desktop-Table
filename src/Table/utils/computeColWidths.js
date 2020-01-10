export default function(allCols, colMinWidths) {
  let totalColsWidth = 0;
  const cannotExpandMap = {};
  let cannotExpandTotalWidth = 0;
  const containerWidth =
    containerRef.current.clientWidth - /* this.scrollBarY */ 17;

  // - 将maxColWidthList所有值相加，得出总宽度（计算总宽度）
  // - 记录maxColWidthList中为0的项的数量
  // - 将不允许扩展宽度的列的宽度相加
  // - 记录不允许扩展宽度列的索引
  allCols.forEach(col => {
    const { width = 0, cannotExpand, __key } = col;

    if (cannotExpand) {
      cannotExpandTotalWidth += width;
      cannotExpandMap[__key] = true;
    }

    totalColsWidth += width;
  }); // END

  const colWidths = {};
  // 如果表格 物理宽度 大于 计算宽度   diff > 0
  const diff = containerWidth - totalColsWidth;
  let mainTableWidth = 0;
  let fixedLeftTableWidth = 0;
  let fixedRightTableWidth = 0;

  allCols.forEach(({ __key, fixed, cannotExpand }) => {
    const minWidth = colMinWidths[__key];
    let _result = minWidth || 0;

    if (diff > 0 && !cannotExpand) {
      // 需要自动扩展 列宽 ==>>  除了不允许扩展的列, 其他均匀分配 多出的
      _result =
        minWidth +
        diff * (minWidth / (totalColsWidth - cannotExpandTotalWidth));

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

  // -5 只是一个大概值，因为js计算有误差，不能以 0 作为判断
  // this.scrollBarX = containerWidth - totalW < 0 ? SCROLL_BAR_WIDTH : 0;
  // this.columns = { ...this.columns, all: result };
  return {
    totalTableWidth,
    fixedLeftTableWidth,
    fixedRightTableWidth,
    mainTableWidth,
    colWidths,
  };
}
