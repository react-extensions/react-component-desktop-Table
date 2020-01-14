import { Column } from '../Table';
import getColumnMinWidths, { ColMinWidths } from './computeColumnMinWidths';

export interface ParsedColumn extends Column {
  __key: number;
}

export interface ParsedData {
  fixedLeftCols: ParsedColumn[];
  fixedRightCols: ParsedColumn[];
  mainCols: ParsedColumn[];
  allCols: ParsedColumn[];
  colMinWidths: ColMinWidths;
}

export default function parseColumns(columns: Column[]): ParsedData {
  // 处理 columns
  const fixedLeftCols: ParsedColumn[] = [];
  const fixedRightCols: ParsedColumn[] = [];
  const mainCols: ParsedColumn[] = [];
  const allCols: ParsedColumn[] = [];
  // 当前表格的类型  带有单选 | 有多选功能  | 无
  // let tableCheckType = NONE;

  for (let i = 0, len = columns.length; i < len; i += 1) {
    const { type, width, fixed, cannotExpand } = columns[i];

    // 宽度
    const _width = width || (type ? 50 : undefined);

    // 如果设置type 或 width 则禁止扩展宽度
    const _cannotExpand = cannotExpand || !!type || !!fixed;

    // 拷贝
    const parsedColumn: ParsedColumn = {
      ...columns[i],
      __key: i, // ??? 记录原始位置。是否让用户自己定义
      width: _width,
      cannotExpand: _cannotExpand,
    };

    // 定义表格的类型
    // if (tableCheckType === NONE) {
    //   if (type === 'checkbox') {
    //     tableCheckType = CHECKBOX;
    //   } else if (type === 'radio') {
    //     tableCheckType = RADIO;
    //   }
    // }
    // 根据fixed 属性， 分配
    switch (fixed) {
      case 'left':
        fixedLeftCols.push(parsedColumn);
        break;
      case 'right':
        fixedRightCols.push(parsedColumn);
        break;
      default:
        mainCols.push(parsedColumn);
        break;
    }
    // 收集
    allCols.push(parsedColumn);
  }

  // 最小列宽
  const colMinWidths: ColMinWidths = getColumnMinWidths(allCols);

  return {
    fixedLeftCols,
    fixedRightCols,
    mainCols,
    allCols,
    // tableCheckType,
    colMinWidths,
  };
}
