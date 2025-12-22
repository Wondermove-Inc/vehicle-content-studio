import { TableBodyProps as MuiTableBodyProps, TableBodyTypeMap } from '@mui/material/TableBody';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsTableBodyProps {
}
export interface TableBodyProps extends Omit<MuiTableBodyProps, 'ref'> {
    hdsProps?: hdsTableBodyProps | boolean;
}
export declare const TableBody: OverridableComponent<TableBodyTypeMap<TableBodyProps, "tbody">> & {
    displayName: string;
};
export default TableBody;
