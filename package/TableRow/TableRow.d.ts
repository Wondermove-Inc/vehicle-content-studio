import { TableRowProps as MuiTableRowProps, TableRowTypeMap } from '@mui/material/TableRow';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsTableRowProps {
}
export interface TableRowProps extends Omit<MuiTableRowProps, 'ref'> {
    hdsProps?: hdsTableRowProps | boolean;
}
export declare const TableRow: OverridableComponent<TableRowTypeMap<TableRowProps, "tr">> & {
    displayName: string;
};
export default TableRow;
