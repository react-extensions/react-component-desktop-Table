import { useContext } from 'react';
import TableConfigContext from './context';

export default function useTableConfig() {
  return useContext(TableConfigContext);
}
