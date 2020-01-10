import React from 'react';
import Checkbox from '../checkbox';

export default function(props) {
  const { rowData, rowIndex, getCheckboxProps, ...rest } = props;
  const otherProps = getCheckboxProps(rowData, rowIndex);
  return <Checkbox {...otherProps} {...rest} />;
}
