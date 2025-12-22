import { TableFooterProps as MuiTableFooterProps, TableFooterTypeMap } from '@mui/material/TableFooter';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsTableFooterProps {
}
export interface TableFooterProps extends Omit<MuiTableFooterProps, 'ref'> {
    hdsProps?: hdsTableFooterProps | boolean;
}
export declare const TableFooter: OverridableComponent<TableFooterTypeMap<TableFooterProps, "tfoot">> & {
    displayName: string;
};
export default TableFooter;
