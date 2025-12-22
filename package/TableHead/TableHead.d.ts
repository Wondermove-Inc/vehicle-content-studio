import { TableHeadProps as MuiTableHeadProps, TableHeadTypeMap } from '@mui/material/TableHead';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsTableHeadProps {
}
export interface TableHeadProps extends Omit<MuiTableHeadProps, 'ref'> {
    hdsProps?: hdsTableHeadProps | boolean;
}
export declare const TableHead: OverridableComponent<TableHeadTypeMap<TableHeadProps, "thead">> & {
    displayName: string;
};
export default TableHead;
