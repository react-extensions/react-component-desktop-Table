export default function ExpandRow({ content, rowData }) {
  return typeof content === 'function' ? content(rowData) : content;
}
