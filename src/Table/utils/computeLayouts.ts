import { ParsedColumn } from './parseColumns';
import { ColMinWidths } from './computeColumnMinWidths';

export interface ColumnWidths {
  [key: string]: number;
}

export interface Layouts {
  totalTableWidth: number;
  fixedLeftTableWidth: number;
  fixedRightTableWidth: number;
  mainTableWidth: number;
  colWidths: ColumnWidths;
}

export default function computeLayouts(
  _containerWidth: number,
  columns: ParsedColumn[],
  colMinWidths: ColMinWidths
): Layouts {
  const containerWidth = _containerWidth - /* this.scrollBarY */ 17;
  let totalColsWidth = 0;
  let cannotExpandTotalWidth = 0;

  columns.forEach(col => {
    // - 将maxColWidthList所有值相加，得出总宽度（计算总宽度）
    // - 将不允许扩展宽度的列的宽度相加
    const { width = 0, cannotExpand } = col;

    if (cannotExpand) {
      cannotExpandTotalWidth += width; // TODO ?如果没设置
    }

    totalColsWidth += width;
  });

  const colWidths: ColumnWidths = {};
  const diff = containerWidth - totalColsWidth; // 如果表格 物理宽度 大于 计算宽度   diff > 0
  let mainTableWidth = 0;
  let fixedLeftTableWidth = 0;
  let fixedRightTableWidth = 0;

  columns.forEach(({ __key, fixed, cannotExpand }) => {
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
  });

  const totalTableWidth = fixedLeftTableWidth + fixedRightTableWidth + mainTableWidth;

  return {
    totalTableWidth,
    fixedLeftTableWidth,
    fixedRightTableWidth,
    mainTableWidth,
    colWidths,
  };
}
