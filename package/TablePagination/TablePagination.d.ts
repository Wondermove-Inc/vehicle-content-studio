/// <reference types="react" />
import { TablePaginationProps as MuiTablePaginationProps, TablePaginationBaseProps, TablePaginationTypeMap } from '@mui/material/TablePagination';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsTablePaginationProps {
    size?: 'xsmall' | 'small';
    isRowsPerPage?: boolean;
}
export interface TablePaginationProps extends Omit<MuiTablePaginationProps, 'ref'> {
    hdsProps?: hdsTablePaginationProps | boolean;
}
export declare const TablePagination: OverridableComponent<TablePaginationTypeMap<TablePaginationProps, import("react").JSXElementConstructor<TablePaginationBaseProps>>> & {
    displayName: string;
};
export default TablePagination;
