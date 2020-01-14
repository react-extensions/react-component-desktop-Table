import { createContext } from 'react';

export interface TableConfig {
  clsPrefix: string;
}

export default createContext<TableConfig>({
  clsPrefix: 'RC',
});
