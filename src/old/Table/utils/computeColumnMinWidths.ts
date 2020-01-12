import { ParsedColumn } from '../hooks/useColumnsParse';

export interface ColMinWidths {
  [key: string]: number;
}

type Key<TKey> = TKey;

type Span<TKey> = [HTMLSpanElement, Key<TKey>];

// TODO: 大致运行需要15ms。优化
export default function getColumnMinWidths(columns: ParsedColumn[]) {
  console.time('getColumnMinWidths');

  const div = document.createElement('div');

  const spans: Span<ParsedColumn['__key']>[] = [];

  columns.forEach(({ title, __key, width }) => {
    const span = document.createElement('span');

    span.setAttribute(
      'style',
      `white-space:nowrap;overflow:hidden;display:inline-block;width:${width ? `${width}px` : 'auto'}`
    );

    // FIXME: 防止注入
    span.innerText = title || '';

    div.appendChild(span);

    spans.push([span, __key]);
  });

  div.setAttribute('style', 'position:fixed;z-index:-99;visibility:hidden;');

  document.body.appendChild(div);

  const colMinWidths: ColMinWidths = spans.reduce((result: ColMinWidths, [span, key]) => {
    // eslint-disable-next-line no-param-reassign
    result[key] = span.offsetWidth;

    return result;
  }, {});

  // document.body.removeChild(div);
  console.timeEnd('getColumnMinWidths');

  console.log(colMinWidths);

  return colMinWidths;
}
