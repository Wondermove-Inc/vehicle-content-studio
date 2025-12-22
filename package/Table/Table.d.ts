import { TableProps as MuiTableProps, TableTypeMap } from '@mui/material/Table';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsTableProps {
    size?: 'small' | 'medium' | 'large';
}
export interface TableProps extends Omit<MuiTableProps, 'ref'> {
    hdsProps?: hdsTableProps | boolean;
}
export declare const Table: OverridableComponent<TableTypeMap<TableProps, "table">> & {
    displayName: string;
};
export default Table;
